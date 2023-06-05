const express = require('express')
const Book = require('../models/book.model')

module.exports.getBooks = async (req, res) => {
    // pagination
}

module.exports.getBook = async (req, res) => {
    let id = req.params.id

    let book = await Book.findById(id)

    if(book){
        res.status(200).json({
            data: book,
            status: 'OK'
        })
    }else{
        res.status(404).json({
            data: {},
            status: 'ERROR',
            errorMessage: 'this book does not exist'
        })
    }
}

module.exports.newBook = async (req, res) => {
    // multer book cover upload
}

module.exports.delBook = async (req, res) => {
    let id = req.params.id
    
    await Book.findByIdAndDelete(id)
        .then(() => {
            res.status(200).json({
                data: {},
                status: 'OK'
            })
        })
        .catch(err => {
            res.status(404).json({
                data: {},
                status: 'ERROR',
                errorMessage: 'failed to delete this book'
            })
        })
}