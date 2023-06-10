const mongoose = require('mongoose')

const notificationSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Notification', notificationSchema)