const User = require('../model/userModel')
require('dotenv').config({ path: '../config.env'})
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT

// register function
exports.register = async (req, res, next) => {
    
    const { username, password } = req.body;

    if (password.length < 6) {
        return res.status(400).json({ message: 'Password less then 6 char is not allowed'});
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
                        expiresIn: maxAge,
                    }
                );

                res.cookie('jwt', token, {
                    httpOnly: true, // protection
                    maxAge: maxAge * 1000,
                })

                res.status(201).json({
                    message: 'User successfully created',
                    user: user._id
                })
            })
            .catch ((err) => {
                res.status(400).json({
                    message: 'User not created',
                    error: err.message
                })
            })
    })
}

// login function 
exports.login = async (req, res, next) => {
    const { username, password } = req.body

    if(!username || !password) {
        return res.status(400).json({ message: 'Username or Password not present'})
    }

    try {
        const user = await User.findOne({ username })

        if(!user) {
            res.status(400).json({
                message: 'Login not successful',
                error: 'User not found'
            })
        } else {
            bcrypt.compare(password, user.password)
                .then(function (result) {
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