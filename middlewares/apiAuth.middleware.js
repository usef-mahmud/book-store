const jwt = require('jsonwebtoken')
module.exports.apiIsAuth = (req, res, next) => {
    if(req.headers.authorization) {
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY, err => {
          err ? res.status(401).json({
            data: {},
            status: 'ERROR',
            errorMessage: 'invalid api token'
          }) : next()  
        })
    }else{
        res.status(401).json({
            data: {},
            status: 'ERROR',
            errorMessage: 'api token is empty'
          })
    }
}