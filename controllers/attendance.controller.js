const attendanceModel = require('../models/index').attendance
const userModel = require('../models/index').users
const { Op, fn, col, literal, where, Model } = require('sequelize')
const moment = require('moment')
const { date } = require('joi')
const attendance = require('../models/attendance')

exports.addAttendance = (req, res) => {
    let newAttendance = {
        user_id: req.body.user_id,
        date: req.body.date,
        time: req.body.time,
        status: req.body.status
    }

    attendanceModel.create(newAttendance).then(result => {
        let attendanceData = {
            attendance_id: result.id,
            user_id: result.user_id, 
            date: moment(result.date).format('YYYY-MM-DD'),
            time: result.time,
            status: result.status
        }
        return res.json({
            status: 'success',
            message: 'Presensi berhasil dicatat',
            data: attendanceData
        })
    })
    .catch(error => {
        return res.status(500).json({
            success: false,
            message: `Error recording attendance: ${error.message}`
        })
    })
}

exports.getAttendanceById = async (req, res) => {
    const { user_id } = req.params

    attendanceModel.findAll({ where: { user_id: user_id } }).then(attendanceData => {
        if (attendanceData.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No attendance records found for User ID ${user_id}`
            })
        }
        const formattedData = attendanceData.map(item => ({
            attendance_id: item.id,
            date: moment(item.date).format('YYYY-MM-DD'),
            time: item.time,
            status: item.status
        }))

        return res.json({
            status: 'success',
            data: formattedData
        })
    })
    .catch(error => {
        return res.status(500).json({
            success: false,
            message: `Error retrieving attendance: ${error.message}`
        })
    })
}