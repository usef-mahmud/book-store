module.exports.isAuth = (req, res, next) => {
    if(!req.body.token){
        res.status(401).send('Unauthorized')
    }

    next()
}