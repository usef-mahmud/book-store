const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    age: {
        required: true,
        type: Number
    },
    deleted: {
        type: Boolean,
        default: false
    },
    token: {
        type: String
    }
})

module.exports = mongoose.model('User', userSchema)