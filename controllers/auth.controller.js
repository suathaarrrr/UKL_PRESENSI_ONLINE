const express = require('express');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const userModel = require('../models/index').user;
const authenticate = async (req, res) => {
    try {
        let dataLogin = {
            username: req.body.username,
            password: md5(req.body.password)
        };

        let datauser = await userModel.findOne({where: dataLogin});

        if (datauser) {
            let payload = JSON.stringify(datauser);
            let secret = 'suthaar'
            let token = jwt.sign(payload, secret);

            return res.json({
                status: 'success',
                message: 'Login berhasil',
                token: token,
            });
        }

        return res.json({
            success: false,
            logged: false,
            message: 'Authentication failed. Invalid username or password'
        });
    } catch (error) {
        
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const authorize = (req, res, next) => {
    try {
        let headers = req.headers.authorization
        let tokenKey = headers && headers.split(" ")[1]

        if (tokenKey == null) {
            return res.json({
                success: false,
                message: 'Unauthorized user'
            });
        }

        let secret = 'suthaar';

        jwt.verify(tokenKey, secret, (error, user) => {
            if (error) {
                return res.json({
                    success: false,
                    message: 'Invalid token'
                });
            }
        });

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

module.exports = { authenticate, authorize };