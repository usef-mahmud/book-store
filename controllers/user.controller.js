const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user.model')

module.exports.getAll = async (req, res) => {
    await User.find({})
        .then(users => res.status(200).json({
            data: users,
            status: 'OK'
        }))
        .catch(err => res.status(502).json({
            data: {},
            status: 'ERROR',
            errorMessage: 'couldn\'t get all users'
        }))
}

module.exports.getUser = async (req, res) => {
    let {id} = req.params
    let user = await User.findOne({_id: id})

    if(user){
        res.status(200).json({
            data: user,
            status: 'OK'
        })
    }else{
        res.status(404).json({
            data: {},
            status: 'ERROR',
            errorMessage: 'user not found'
        })
    }
}

module.exports.register = async (req, res) => {
    const { name, email, password, age, keepLoggedIn } = req.body
    const validationErrors = validationResult(req)

    if(validationErrors.isEmpty()){
        let match = await User.findOne({email: email})
        if(match){
            res.status(404).json({
                data: {},
                status: 'ERROR',
                errorMessage: 'this email is already used before'
            })
        }else{
            let hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt())
            const newUser = new User({
                name: name,
                email: email,
                password: hashedPassword,
                age: age
            })
    
            let userToken = jwt.sign(
                { uid: newUser._id },
                process.env.SECRET_KEY,
                {
                    expiresIn: keepLoggedIn ? '30d' : 1*24*60*60 // 1 day
                }
            )
            newUser
                .save()
                .then(() => {
                    res.status(200).json({
                        data: {
                            token: userToken
                        },
                        status: 'OK'
                    })
                })
                .catch(() => {
                    res.status(404).json({
                        data: {},
                        status: 'ERROR',
                        errorMessage: 'failed to register new user'
                    })
                })
                    
        }
    }else{
        res.status(404).json({
            data: {},
            status: 'ERROR',
            errorMessage: validationErrors
        })
    }
    
    
    
}

module.exports.delUser = async (req, res) => {
    const id = req.params.id
    let user = await User.findOne({_id: id})

    if(user){
        await User.updateOne({_id: id}, {deleted: true})
            .then(() => {
                res.status(200).json({
                    data: {},
                    status: 'OK'
                })
            })
    }else{
        res.status(404).json({
            data: {},
            status: 'ERROR',
            errorMessage: 'user not found'
        })
    }
}

module.exports.delUserPermanently = async (req, res) => {
    let id = req.params.id
    await User.findByIdAndDelete(id)
        .then(() => {
            res.status(200).json({
                data: {},
                status: 'OK'
            })
        })
        .catch(err => {
            res.status(404).json({
                data: {},
                status: 'ERROR',
                errorMessage: 'failed to delete user permanently'
            })
        })
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body
    const matchUser = await User.findOne({email: email})
    if(matchUser){
        let compared = await bcrypt.compare(password, matchUser.password)
        if(compared){
            const token = jwt.sign(
                { uid: matchUser._id },
                process.env.SECRET_KEY,
                { expiresIn: '30d' }
            )
            delete matchUser._doc.password

            res.status(200).json({
                data: {
                    ...matchUser._doc,
                    token: token
                },
                status: 'OK'
            })
        }else{
            res.status(404).json({
                data: {},
                status: 'ERROR',
                errorMessage: 'password is not correct'
            })
        }
    }else{
        res.status(404).json({
            data: {},
            status: 'ERROR',
            errorMessage: 'there is no user with this email'
        })
    }
}

module.exports.checkLoggedIn = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    if(!token){
        res.status(200).json({
            data: {},
            status: 'ERROR',
            errorMessage: 'token was not found'
        })
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if(err){
            res.status(200).json({
                data: {
                    loggedIn: false
                },
                status: 'OK'
            })
        }

        res.status(200).json({
            loggedIn: true,
            data: {
                userId: decoded.uid
            },
            status: 'OK'
        })
    })
}