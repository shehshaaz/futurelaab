const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    test: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    },
    addedAt: {
        type: Date,
        default: Date.now
    }
});

// Ensure a user can only have one entry per test
CartItemSchema.index({ user: 1, test: 1 }, { unique: true });

module.exports = mongoose.model('Cart', CartItemSchema);