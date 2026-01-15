const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other'],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    profilePic: {
        type: String,
        default: '',
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
