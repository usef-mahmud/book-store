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
        required: true,
        type: Number
    },
    description: {
        required: true,
        type: String
    },
    cover: {
        required: true,
        type: String
    }
})


module.exports = mongoose.model('Book', bookSchema)