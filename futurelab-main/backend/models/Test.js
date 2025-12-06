const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [100, 'Name cannot be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        trim: true
    },
    subcategory: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
        min: [0, 'Price cannot be negative']
    },
    originalPrice: {
        type: Number,
        min: [0, 'Original price cannot be negative']
    },
    discountPercentage: {
        type: Number,
        min: [0, 'Discount percentage cannot be negative'],
        max: [100, 'Discount percentage cannot exceed 100']
    },
    includes: {
        type: [String],
        default: []
    },
    preparation: {
        type: String
    },
    reportsIn: {
        type: String
    },
    fastingRequired: {
        type: Boolean,
        default: false
    },
    homeSampleCollection: {
        type: Boolean,
        default: true
    },
    totalTests: {
        type: Number,
        default: 1
    },
    isActive: {
        type: Boolean,
        default: true
    },
    tags: {
        type: [String],
        default: []
    },
    image: {
        type: String
    },
    ratings: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot be more than 5']
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create indexes for better query performance
TestSchema.index({ category: 1 });
TestSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Test', TestSchema);