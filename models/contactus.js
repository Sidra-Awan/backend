const mongoose = require('mongoose');

const contactinfo= new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    phone: {
        required: true,
        type: Number
    },
    message: {
        required: true,
        type: String
    }
})
module.exports = mongoose.model('contactusinfo', contactinfo)