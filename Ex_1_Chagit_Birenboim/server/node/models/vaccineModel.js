const mongoose = require('mongoose');

const vaccineSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    vaccinations: [{
        date: {
            type: Date,
        },
        manufacturer: {
            type: String,
        }
    }]
});

const Vaccine = mongoose.model('Vaccine', vaccineSchema);

module.exports = Vaccine;
