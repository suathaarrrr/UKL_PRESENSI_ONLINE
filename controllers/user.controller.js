const userModel = require('../models/index').user
const md5 = require(`md5`)

exports.addUser = (req, res) => {
    let newUser = {
        name: req.body.name,
        username: req.body.username,
        password: md5(req.body.password),
        role: req.body.role
    }

    userModel.create(newUser)
    .then(result => {
        return res.json({
            success: true,
            data: result,
            message: 'New User has been added',
        })
    })
    .catch(error => {
        return res.json({
            success: false,
            message: error.message
        })
    })
}

exports.updateUser = (req, res) => {
    let dataUser = {
        name: req.body.name,
        username: req.body.username,
        password: md5(req.body.password),
        role: req.body.role
    }
    let idUser = req.params.id;
    userModel.update(dataUser, { where: { id: idUser } })
    .then(result => {
        return res.json({
            success: true,
            message: 'User data has been updated',
            data: dataUser
        })
    })
    .catch(error => {
        return res.json({
            success: false,
            message: error.message
        })
    })
}

exports.getUserById = (req, res) => {
    let idUser = req.params.id;

    userModel.findOne({ where: { id: idUser } })
    .then(user => {
        if (user) {
            return res.json({
                success: true,
                data: user,
                message: 'User data retrieved successfully'
            })
        } else {
            return res.json({
                success: false,
                message: 'User not found'
            })
        }
    })
    .catch(error => {
        return res.json({
            success: false,
            message: error.message
        })
    })
}