const express = require('express')
const router = express.Router()

const orderController = require('../controllers/order.controller')

router.route('/')
    .get(orderController.getOrders)
    .post(orderController.newOrder)

router.route('/:id')
    .get(orderController.getOrder)

router.post(
        '/:id/delivered',
        orderController.delivered
    )

module.exports = router

/**
 * TODO: send notifications middleware
 * FIXME: [x]
 */