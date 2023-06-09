const {validationResult} = require('express-validator')

const Book = require('../models/book.model')

module.exports.getAll = async (req, res) => {
    // pagination
    let limit = parseInt(req.query.limit),
        currPage = parseInt(req.query.page)

    const countBooks = await Book.countDocuments({})
    let projection = 'title price discount cover author'

    if(limit && currPage){
        const limitedBooks = await Book.find({}, projection).skip((currPage-1)*limit).limit(limit)
        res.status(200).json({
            data: {
                books: limitedBooks,
                _metadata: {
                    total: countBooks,
                    current_page: currPage,
                    limit: limit,
                    paging: {
                        previous: currPage != 1 ? `/books?page=${currPage-1}&limit=${limit}` : null,
                        next: Math.ceil(countBooks/limit) >= (currPage+1) ? `/books?page=${currPage+1}&limit=${limit}` : null,
                        self: `/book?page=${currPage}&limit=${limit}`,
                        first: `/books?page=1&limit${limit}`,
                        last: `/books?page=${Math.ceil(countBooks/limit)}&limit=${limit}`
                    }
                }
            },
            status: 'OK'
        })
    }else{
        const allBooks = await Book.find({}, projection)
        res.status(200).json({
            data: {
                books: allBooks,
                total: countBooks,
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
    const {title, price, discount, description, author, cover, admin} = req.body

    const validationErrors = validationResult(req)
    if(validationErrors.isEmpty()){
        const book = new Book({
            title: title,
            description: description,
            price: price,
            discount: discount,
            author: author,
            cover: cover,
            admin: admin
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
                        author,
                        admin
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

module.exports.editBook = async (req, res) => {
    let edtiedData = req.body
        id = req.params.id
    
    await Book.updateOne({_id: id}, edtiedData)
            .then(book => {
                res.status(200).json({
                    data: {},
                    status: 'OK'
                })
            })
            .catch(err => {
                res.status(500).json({
                    data: {},
                    status: 'ERROR',
                    errorMessage: 'failed to update this book'
                })
            })
}