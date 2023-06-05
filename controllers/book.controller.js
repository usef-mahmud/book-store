const express = require('express')
const {validationResult} = require('express-validator')

const Book = require('../models/book.model')

module.exports.getBooks = async (req, res) => {
    // pagination
    let limit = req.query.limit,
        currPage = req.query.page

    
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
    const tempCoverUrl = 'https://downloads.hindawi.org/covers/svg/270x360/84935850.svg'
    const {title, price, discount, description, author} = req.body

    const validationErrors = validationResult(req)
    if(validationErrors.isEmpty()){
        res.status(200).json({
            data: {
                title,
                price,
                discount,
                description,
                author
            },
            status: 'OK'
        })
    }else{
        res.status(400).json({
            data: {},
            status: 'ERROR',
            errorMessage: validationErrors
        })
    }
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