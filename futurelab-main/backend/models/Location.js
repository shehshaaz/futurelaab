const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    pincode: {
        type: String,
        required: [true, 'Please add a pincode'],
        match: [/^[0-9]{6}$/, 'Please add a valid 6 digit pincode'],
        unique: true
    },
    city: {
        type: String,
        required: [true, 'Please add a city'],
        trim: true
    },
    state: {
        type: String,
        required: [true, 'Please add a state'],
        trim: true
    },
    area: {
        type: String,
        trim: true
    },
    isServiceable: {
        type: Boolean,
        default: true
    },
    deliveryTime: {
        type: String,
        default: '24-48 hours'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Location', LocationSchema);