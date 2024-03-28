const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    identityNum: {
        type: String,
        require: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true
    },
    numHouse: {
        type: Number,
        required: true
    },
    dateBirth: {
        type: Date,
        require: true
    },
    phone: {
        type: String,
        required: true
    },
    mobilePhone: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;