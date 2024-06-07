const { Task } = require('../model/taskModel')
const { User } = require('../model/userModel')

const getTasks = async (req, res) => {
    try {
        const allTask = await Task.find();

        res.status(200).json({
            status: 'success',
            data: {
                allTask
            }
        })
    } catch (error) {
        console.log(error);
    }
}

const createATask = async (req, res) => {
    try {
        const { username, title, description } = req.body;

        const user = await User.findOne({ username: username });
        if (!user) {
            throw new Error('User not found');
        }

        const newTask = new Task({
            title: title,
            description: description,
            user: user._id
        });

        await newTask.save();

        res.status(200).json({
            status: 'success',
            data: {
                newTask
            }
        })

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}


module.exports = {
    getTasks,
    createATask
};