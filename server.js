require('dotenv').config()
const express = require('express')

const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const usersRouter = require('./routers/users.router')
const booksRouter = require('./routers/books.router')
const ordersRouter = require('./routers/orders.router')

const app = express()
const PORT = process.env.PORT || 8000

mongoose.connect(process.env.DB_URL)
        .then(() => {
            console.log('database connected')
        })
        .catch(err => {
            console.log('failed to connect with database', err)
        })

app.use(bodyParser.json())

app.use('/users', usersRouter)
app.use('/books', booksRouter)
app.use('/orders', ordersRouter)

app.listen(PORT, () => console.log('server started!'))