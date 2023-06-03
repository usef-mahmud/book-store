const jwt = require('jsonwebtoken')
module.exports.isAuth = (req, res, next) => {
    if(req.headers.authorization) {
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY, err => {
          err ? res.status(401).json({message: 'Invalid token'}) : next()  
        })
    }else{
        res.status(401).json({message: 'Unauthorized'})
    }
}