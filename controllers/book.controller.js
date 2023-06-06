const express = require('express')
const {validationResult} = require('express-validator')

const Book = require('../models/book.model')

module.exports.getBooks = async (req, res) => {
    // pagination
    let limit = parseInt(req.query.limit),
        currPage = parseInt(req.query.page)

    const allBooks = await Book.find({})

    if(limit && currPage){
        res.status(200).json({
            data: {
                books: allBooks.slice((currPage - 1)*limit, currPage * limit),
                _metadata: {
                    total: allBooks.length,
                    current_page: currPage,
                    limit: limit,
                    paging: {
                        previous: currPage != 1 ? `/books?page=${currPage-1}&limit=${limit}` : null,
                        next: Math.ceil(allBooks.length/limit) >= (currPage+1) ? `/books?page=${currPage+1}&limit=${limit}` : null,
                        self: `/book?page=${currPage}&limit=${limit}`,
                        first: `/books?page=1&limit${limit}`,
                        last: `/books?page=${Math.ceil(allBooks.length/limit)}&limit=${limit}`
                    }
                }
            },
            status: 'OK'
        })
    }else{
        res.status(200).json({
            data: {
                books: allBooks,
                total: allBooks.length,
            },
            status: 'OK'
        })
    }
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
    const {title, price, discount, description, author, cover} = req.body

    const validationErrors = validationResult(req)
    if(validationErrors.isEmpty()){
        const book = new Book({
            title: title,
            description: description,
            price: price,
            discount: discount,
            author: author,
            cover: cover
        })
        
        book
            .save()
            .then(() => {
                res.status(200).json({
                    data: {
                        title,
                        price,
                        discount,
                        cover: tempCoverUrl,
                        description,
                        author
                    },
                    status: 'OK'
                })
            })
            .catch(err => {
                res.status(400).json({
                    data: {},
                    status: 'ERROR',
                    errorMessage: 'failed to add new book'
                })
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