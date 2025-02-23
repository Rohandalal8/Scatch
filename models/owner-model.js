const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        minLenght: 3,
        trim: true
    },
    email: String,
    password: String,
    products: {
        type: Array,
        default: []
    },
    picture: String,
    gstin: String
});

module.exports = mongoose.model('Onwer', ownerSchema);