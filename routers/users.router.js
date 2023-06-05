const express = require('express')
const router = express.Router()

const {userValidator} = require('../middlewares/validators.middleware')

const userController = require('../controllers/user.controller')

router.route('/')
    .get(userController.getUsers)
    .post(userValidator(), userController.newUser)

router.route('/:id')
    .get(userController.getUser)
    .delete(userController.delUser)

router.delete('/:id/delete-permanently', userController.delUserPermanently)

router.post('/login', userController.login)

module.exports = router