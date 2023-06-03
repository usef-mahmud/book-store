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

}

exports.delUser = async (req, res) => {

}

exports.login = async (req, res) => {

}