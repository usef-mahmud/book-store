const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    admin: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    book: {
        type: mongoose.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    delivered: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Order', userSchema)