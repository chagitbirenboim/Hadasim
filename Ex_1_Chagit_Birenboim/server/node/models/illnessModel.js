const mongoose = require('mongoose');

const illnessSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    illnessDate: {
        type: Date,
    },
    recoveryDate: {
        type: Date,
    }
});

const Illness = mongoose.model('Illness', illnessSchema);

module.exports = Illness;
