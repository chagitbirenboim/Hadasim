const moment = require('moment');

const User = require('../models/userModel');
const Illness = require('../models/illnessModel');

// פונקציה להוספת רשומת חולה למשתמש עם אפשרות לציין תאריך התשובה החיובית ותאריך ההחלמה
exports.addIllnessToUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        // בודק אם המשתמש כבר חלה פעם אחת
        const existingIllness = await Illness.findOne({ user: req.params.userId });
        if (existingIllness) {
            return res.status(400).json({
                status: 'fail',
                message: 'User already had an illness'
            });
        }

        // הוספת רשומת החולה למשתמש עם תאריך קבלת התשובה החיובית
        const newIllness = await Illness.create({
            user: req.params.userId,
            illnessDate: req.body.illnessDate,
            recoveryDate: req.body.recoveryDate
        });

        res.status(201).json({
            status: 'success',
            data: {
                illness: newIllness
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// פונקציה לעדכון תאריך החלמה לרשומת חולה
exports.updateIllnessRecoveryDate = async (req, res) => {
    try {
        // מצא את רשומת החולה במסד הנתונים
        const illness = await Illness.findById(req.params.illnessId);
        if (!illness) {
            return res.status(404).json({
                status: 'fail',
                message: 'Illness not found'
            });
        }

        // בדוק אם תאריך החלמה כבר נקבע
        if (illness.recoveryDate) {
            return res.status(400).json({
                status: 'fail',
                message: 'Recovery date already set'
            });
        }

        // עדכן את תאריך ההחלמה ושמור את רשומת החולה
        illness.recoveryDate = req.body.recoveryDate;
        await illness.save();

        res.status(200).json({
            status: 'success',
            data: {
                illness
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// פונקציה לעדכון תאריך התשובה החיובית ותאריך ההחלמה לרשומת חולה
exports.updateIllnes = async (req, res) => {
    try {
        // מצא את רשומת החולה במסד הנתונים
        const illness = await Illness.findOneAndUpdate({ user: req.params.user_id }, req.body, {
            new: true,
            runValidators: true
        });
        if(!illness){
            Illness.create(req.params)
        }
        res.status(200).json({
            status: 'success',
            data: {
                illness
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.getIllnesByIdUser = async (req, res) => {
    try {
        const illnes = await Illness.findOne({ user: req.params.user_id });
        const formattedIllnessDate = moment(illnes.illnessDate).format('YYYY-MM-DD');
        const formattedRecoeveryDate = moment(illnes.recoveryDate).format('YYYY-MM-DD');

        const formattedIllnesses = { ...illnes.toObject(), illnessDate: formattedIllnessDate, recoveryDate: formattedRecoeveryDate };

        res.status(200).json(
                formattedIllnesses
            );
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
};
