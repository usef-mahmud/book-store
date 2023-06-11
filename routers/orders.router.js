const express = require('express')
const router = express.Router()

const orderController = require('../controllers/order.controller')
const notificationController = require('../controllers/notification.controller')

router.route('/')
    .get(orderController.getAll)
    .post(
        orderController.newOrder,
        notificationController.sendNotification
    )

router.route('/:id')
    .get(orderController.getOrder)

router.put(
        '/:id/delivered',
        orderController.setDelivered
    )

module.exports = router