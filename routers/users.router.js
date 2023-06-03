const express = require('express')
const router = express.Router()

const {isAuth} = require('../middlewares/apiAuth.middleware')
const userController = require('../controllers/user.controller')

router.route('/')
    .get(userController.getUsers)
    .post(userController.newUser)

router.route('/:id')
    .get(userController.getUser)
    .delete(userController.delUser)

router.delete('/:id/delete-permanently', userController.delUserPermanently)

router.post('/login', userController.login)

module.exports = router