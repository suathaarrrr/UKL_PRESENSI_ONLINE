const express = require('express')
const app = express()
let {validateAttendance} = require('../middlewares/attendance-validation')
app.use(express.json())
const attendanceController = require('../controllers/attendance.controller')
const { authorize } = require('../controllers/auth.controller')
app.post("/", [validateAttendance], [authorize], attendanceController.addAttendance)
app.get("/history/:user_id", [authorize], attendanceController.getAttendanceById)
module.exports = app