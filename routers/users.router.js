const express = require('express')
const router = express.Router()

const {isAuth} = require('../middlewares/apiAuth.middleware')
const userController = require('../controllers/user.controller')

router.route('/')
    .get(userController.getUsers)
    .post(userController.newUser)

router.get('/:id', userController.getUser)

router.post('/login', userController.login)

module.exports = router