const User = require('../model/userModel')
require('dotenv').config({ path: './config.env' })
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT

// register function
exports.register = async (req, res, next) => {
    const { username, password } = req.body;

    if (password.length < 6) {
        return res.status(400).json({ message: "Password less than 6 characters" })
    }

    bcrypt.hash(password, 10).then(async (hash) => {
        await User.create({
            username,
            password: hash
        })
            .then((user) => {
                const maxAge = 3 * 60 * 60;
                const token = jwt.sign(
                    { id: user._id,
                        username,
                        role: user.role
                    }, jwtSecret,
                    {
                        expiresIn: maxAge, // 3hrs
                    }
                );

                res.cookie('jwt', token, {
                    httpOnly: true, // protection
                    maxAge: maxAge * 1000,
                });
                
                res.status(201).json({
                    message: 'User successfully created',
                    user: user._id,
                })
            })
            .catch ((err) => {
                res.status(400).json({
                    message: 'User not successfully created',
                    error: err.message
                })
            })
    })
}

// login function
exports.login = async (req, res, next) => {
    const { username, password } = req.body

    if(!username || !password) {
        return res.status(400).json({
            message: 'Username or Password not present',
        })
    }

    try {
        const user = await User.findOne({ username })

        if(!user) {
            res.status(400).json({
                message: 'Login not successful',
                error: 'User not found',
            })
        } else {
            bcrypt.compare(password, user.password).then(function (result) {
                if(result) {
                    const maxAge = 3 * 60 * 60;
                    const token = jwt.sign(
                        { id: user._id, username, role: user.role },
                        jwtSecret,
                        {
                        expiresIn: maxAge, // 3hrs in sec
                        }
                    );
                    res.cookie("jwt", token, {
                        httpOnly: true,
                        maxAge: maxAge * 1000, // 3hrs in ms
                    });
                    res.status(201).json({
                        message: "User successfully Logged in",
                        user: user._id,
                    });
                    } else {
                    res.status(400).json({ message: "Login not succesful" });
                    }
            })
        }
    } catch (err) {
        res.status(400).json({
            message: 'An error occured',
            error: err.message
        })
    }
}

// update function 
exports.update = async (req, res, next) => {
    const { role, id } = req.body

    if(role && id) {
        if (role === 'admin') {
            try {
                const user = await User.findById(id);
                if (!user) {
                    return res.status(404).json({
                        message: 'User not found'
                    });
                }
                if (user.role !== 'admin') {
                    user.role = role;
                    await user.save();
                    return res.status(200).json({
                        message: 'User role updated to Admin'
                    });
                } else {
                    return res.status(400).json({
                        message: 'User is already an Admin'
                    });
                }
            } catch (err) {
                return res.status(500).json({
                    message: 'An error occurred',
                    err: err.message
                });
            }
        } else {
            res.status(400).json({
                message: 'Role is not admin',
            })
        }
    } else {
        res.status(400).json({
            message: 'Role or Id not present'
        })
    }
}

// delete function 
exports.deleteUser = async (req, res, next) => {
    const { id } = req.body;

    try {
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        return res.status(200).json({
            message: 'User successfully deleted',
            user
        });
    } catch (err) {
        return res.status(400).json({
            message: 'An error occurred',
            err: err.message
        });
    }
};
