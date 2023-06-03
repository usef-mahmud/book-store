const express = require('express')
const router = express.Router()

const {isAuth} = require('../middlewares/apiAuth.middleware')
const userController = require('../controllers/user.controller')

router.route('/')
    .get(userController.getUsers)

router.get('/:id', userController.getUser)

module.exports = router