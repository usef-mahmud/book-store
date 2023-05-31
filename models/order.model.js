const mongoose = require('mongoose')
const Schema = mongoose.Schema()

const userSchema = new Schema({
    time: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    delivered: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('User', userSchema)