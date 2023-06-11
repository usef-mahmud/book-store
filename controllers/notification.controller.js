const Notification = require('../models/notification.model')
const Book = require('../models/book.model')

module.exports.sendNotification = async (req, res) => {
    let newOrder = req.newOrder
    let books = await Book.find({_id: newOrder.books}, 'title admin')

    newOrder
        .save()
        .then(async (order) => {
            await Notification.insertMany(books.map(book => {
                console.log(book)
                return {
                    to: book.admin,
                    message: `New book "${book.title}" order received!`
                }
            })).then(() => {
                res.status(200).json({
                    data: {
                        orderId: newOrder._id,
                        sentNotification: true
                    },
                    status: 'OK'
                })
            }).catch((err) => {
                console.log(err)
                res.status(200).json({
                    data: {
                        orderId: newOrder._id,
                        sentNotification: false
                    },
                    status: 'ERROR',
                    errorMessage: 'notification did not sent'
                })
            })
        })
        .catch(() => {
            res.status(500).json({
                data: {},
                status: 'ERROR',
                errorMessage: 'failed to register new order'
            })
        })
}