const express = require('express')
const router = express.Router()

const bookController = require('../controllers/book.controller')

router.route('/')
    .get(bookController.getBooks)
    .post(bookController.newBook)

router.route('/:id')
    .get(bookController.getBook)
    .delete(bookController.delBook)

module.exports = router