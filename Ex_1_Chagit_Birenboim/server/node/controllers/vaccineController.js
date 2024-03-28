const moment = require('moment');

const User = require('../models/userModel');
const Vaccine = require('../models/vaccineModel');

// פונקציה להוספת חיסון למשתמש
exports.addVaccineToUser = async (req, res) => {
    try {
        let vaccine = await Vaccine.findOne({ user: req.params.userId });
        // בודק אם יש למשתמש כבר 4 חיסונים
        if (!vaccine) {
            await Vaccine.create(({
                user: req.params.userId,
                vaccinations: req.body.vaccine,
            }));
            vaccine = await Vaccine.findOne({ user: req.params.userId });
        }
        else if(vaccine?.vaccinations.length >= 4){
            return res.status(400).json({
                status: 'fail',
                message: 'User already has maximum number of vaccines'
            });
        }
        else{
            vaccine.vaccinations.push(req.body.vaccine)
            await vaccine.save();
        } 
        res.status(201).json({
            status: 'success',
            data: {
                vaccine: vaccine
            }
        });
    } catch (err) {
        console.log("error",err)
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// פונקציה למחיקת חיסון מהמשתמש
exports.deleteVaccineFromUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        // מחיקת החיסון מהמשתמש
        await Vaccine.findByIdAndDelete(req.params.vaccineId);

        // מחיקת החיסון מרשימת החיסונים של המשתמש
        user.vaccinationDate.pull(req.params.vaccineId);
        await user.save();

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

exports.getVaccineByIdUser = async (req, res) => {
    try {
        const vaccine = await Vaccine.findOne({ user: req.params.user_id });
        // const formattedVaccineDate = moment(vaccine.vaccinations.date).format('YYYY-MM-DD');
        // vaccine.vaccinations.date = formattedVaccineDate
        // const formattedVaccinations = { ...vaccine.vaccinations.toObject(), date: formattedVaccineDate} ;
        // const formattedVaccine = { ...vaccine.toObject(), vaccinations: formattedVaccinations};

        res.status(200).json(vaccine);
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
};