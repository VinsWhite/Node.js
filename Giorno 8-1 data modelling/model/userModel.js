const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: [true, 'Username must be unique']
    },
    password: {
      type: String,
      minLength: [6, 'Password must be at least 6 characters long'],
      required: [true, 'Password is required']
    },
    role: {
      type: String,
      default: 'Basic',
      required: [true, 'Role is required']
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;