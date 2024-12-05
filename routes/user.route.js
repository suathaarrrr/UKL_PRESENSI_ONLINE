const {authorize} = require('../controllers/auth.controller')

const express = require ('express')

const app = express()

app.use(express.json())

const userController =
require('../controllers/user.controller')

app.post('/', [authorize], userController.addUser)

app.put('/:id', [authorize], userController.updateUser)
app.get('/:id', [authorize], userController.getUserById)

module.exports = app