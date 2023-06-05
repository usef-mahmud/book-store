const express = require('express')
const router = express.Router()

const bookController = require('../controllers/book.controller')

const {bookValidator} = require('../middlewares/validators.middleware')

router.route('/')
    .get(bookController.getBooks)
    .post(bookValidator(), bookController.newBook)

router.route('/:id')
    .get(bookController.getBook)
    .delete(bookController.delBook)

module.exports = router