const express = require('express')
const router = express.Router()

const orderController = require('../controllers/order.controller')

router.route('/')
    .get(orderController.getAll)
    .post(orderController.newOrder)

router.route('/:id')
    .get(orderController.getOrder)

router.put(
        '/:id/delivered',
        orderController.setDelivered
    )

module.exports = router