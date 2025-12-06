const mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    imageUrl: {
        type: String,
        required: [true, 'Please add an image URL']
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        trim: true
    },
    test: {
        type: String,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    displayOrder: {
        type: Number,
        default: 0
    },
    bannerType: {
        type: String,
        enum: ['main', 'bottom', 'carousel'],
        default: 'main'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Banner', BannerSchema);