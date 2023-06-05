const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userModel = require('../models/user.model')

exports.getUsers = async (req, res) => {
    await userModel.find({})
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

exports.getUser = async (req, res) => {
    let {id} = req.params
    let user = await userModel.findOne({_id: id})

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

exports.newUser = async (req, res) => {
    const { name, email, password, age } = req.body
    const validationErrors = validationResult(req)

    if(validationErrors.isEmpty()){
        let match = await userModel.findOne({email: email})
        if(match){
            res.status(404).json({
                data: {},
                status: 'ERROR',
                errorMessage: 'this email is already used before'
            })
        }else{
            let hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt())
            const newUser = new userModel({
                name: name,
                email: email,
                password: hashedPassword,
                age: age
            })
    
            let userToken = jwt.sign(
                { uid: newUser._id },
                process.env.SECRET_KEY,
                { expiresIn: '30d' }
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

exports.delUser = async (req, res) => {
    const id = req.params.id
    let user = await userModel.findOne({_id: id})

    if(user){
        await userModel.updateOne({_id: id}, {deleted: true})
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

exports.delUserPermanently = async (req, res) => {
    let id = req.params.id
    await userModel.findByIdAndDelete(id)
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

exports.login = async (req, res) => {
    const { email, password } = req.body
    const matchUser = await userModel.findOne({email: email})
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