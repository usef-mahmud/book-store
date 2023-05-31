const express = require('express')
const router = express.Router()

const {isAuth} = require('../middlewares/auth.middleware')

router.post('/', isAuth, (req, res) => {
    res.send('users')
})

module.exports = router