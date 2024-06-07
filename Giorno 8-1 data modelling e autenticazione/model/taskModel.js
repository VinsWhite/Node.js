const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minLength: [6, 'Must be at least 6 characters'],
        maxLength: [40, 'Must be max 40 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength: [6, 'Must be at least 6 characters'],
        maxLength: [255, 'Must be max 255 characters']
    },
    status: {
        type: String,
        required: [true, 'Status is required'],
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    dueDate: {
        type: Date,
        required: [true, 'Date is required'],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
