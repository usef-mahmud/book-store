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
    await userModel.findOne({_id: id})
        .then(user => {
            res.status(200).json({
                data: user,
                status: 'OK'
            })
        })
        .catch(err => {
            res.status(404).json({
                data: {},
                status: 'ERROR',
                errorMessage: 'user not found'
            })
        })
}

exports.newUser = async (req, res) => {
    const { name, email, password, age } = req.body

    if(password.length < 8) {
        res.status(404).json({
            data: {},
            status: 'ERROR',
            errorMessages: 'password must be at least 8 characters'
        })
    }else{
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
                email: password,
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
    }
}

exports.delUser = async (req, res) => {

}

exports.login = async (req, res) => {

}