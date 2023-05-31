const mongoose = require('mongoose')
const Schema = mongoose.Schema()

const bookModel = new Schema({
    title: {
        required: true,
        type: String
    },
    author: {
        required: true,
        ref: 'User',
        type: Schema.Types.ObjectId
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

module.exports = mongoose.model('Book', bookModel)