const moment = require('moment');

const User = require('../models/userModel');
const Illness = require('../models/illnessModel');
const Vaccine = require('../models/vaccineModel');
const { json } = require('express');

// פונקציה ליצירת משתמש חדש
exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        console.log("add user", req.body)
        res.status(201).json(
            newUser
        );
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// פונקציה להוספת משתמש חדש עם פרטי חיסונים וחולים
exports.createUserWithVaccinesAndIllnesses = async (req, res) => {
    try {
        // יצירת משתמש חדש
        const newUser = await User.create(req.body.user);
        // וגם הוספת פרטי חיסונים של המשתמש
        if (req.body.vaccine) {
            await Vaccine.create(({
                user: newUser._id,
                vaccinations: req.body.vaccine,
            }));
        }

        // וגם הוספת פרטי חולים של המשתמש
        if (req.body.illness) {
            await Illness.create({
                user: newUser._id,
                illnessDate: req.body.illness.illnessDate,
                recoveryDate: req.body.illness.recoveryDate
            });
        }

        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};


// פונקציה לקריאת כל המשתמשים
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'identityNum firstName lastName city street numHouse dateBirth phone mobilePhone');
        console.log(users.toString())
        res.status(200).json(
            users
        );
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// פונקציה לקריאת משתמש לפי ה-ID שלו
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const formattedDate = moment(user.dateBirth).format('YYYY-MM-DD');

        const formattedUser = { ...user.toObject(), dateBirth: formattedDate };

        res.status(200).json(formattedUser);
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
};

// פונקציה לעדכון פרטי משתמש
exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                user: updatedUser
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// פונקציה למחיקת משתמש
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};