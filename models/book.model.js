const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    discount: {
        type: Number,
        default: 0
    },
    description: {
        required: true,
        type: String
    },
    cover: {
        required: true,
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        type: String,
        required: true
    },
    admin: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
})


module.exports = mongoose.model('Book', bookSchema)