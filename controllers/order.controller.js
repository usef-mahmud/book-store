const Order = require('../models/order.model')
const User = require('../models/user.model')

module.exports.getAll = async (req, res) => {
    let is_delivered = (req.query.is_delivered === 'true')
    
    await Order.find(is_delivered ? {delivered: true} : {})
        .then(orders => {
            res.status(200).json({
                data: orders,
                status: 'OK'
            })
        })
        .catch(err => {
            res.status(500).json({
                data: [],
                status: 'ERROR',
                errorMessage: 'could not get all orders'
            })
        })
}

module.exports.getOrder = async (req, res) => {
    let id = req.params.id

    const order = await Order.findById(id)
    if(order){
        res.status(200).json({
            data: order,
            status: 'OK'
        })
    }else{
        res.status(404).json({
            data: {},
            status: 'ERROR',
            errorMessage: 'there is no orders with this ID'
        })
    }
}

module.exports.newOrder = async (req, res, next) => {
    // notification will be here
    let {user, books} = req.body 

    const matchUser = await User.findById(user)
    if(!matchUser){
        return res.status(404).json({
            data: {},
            status: 'ERROR',
            errorMessage: 'this user does not exist'
        })
    }

    let newOrder = new Order({
        user: user,
        books: books
    })

    req.newOrder = newOrder

    next()
}

module.exports.setDelivered = async (req, res) => {
    let id = req.params.id
    
    const matchOrder = await Order.findById(id)
    if(!matchOrder){
        return res.status(404).json({
            data: {},
            status: 'ERROR',
            errorMessage: 'there is not any order with this ID'
        })
    }

    await Order.updateOne({_id: id}, {
        delivered: true
    }).then(order => {
        res.status(200).json({
            data: {},
            status: 'OK'
        })
    }).catch(() => {
        res.status(500).json({
            data: {},
            status: 'ERROR',
            errorMessage: 'failed to update this order'
        })
    })
}