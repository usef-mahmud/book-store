const express = require('express')
const router = express.Router()

const {userValidator} = require('../middlewares/validators.middleware')

const userController = require('../controllers/user.controller')

router.route('/')
    .get(userController.getAll)
    .post(userValidator(), userController.register)

router.route('/:id')
    .get(userController.getUser)
    .delete(userController.delUser)

router.delete('/:id/delete-permanently', userController.delUserPermanently)

router.post('/login', userController.login)

module.exports = router