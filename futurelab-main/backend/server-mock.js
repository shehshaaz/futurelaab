const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Mock data
const mockTests = [
    {
        _id: '1',
        name: 'Comprehensive Health Checkup',
        description: 'Complete health assessment with 85+ parameters including blood tests, urine tests, and more.',
        category: 'Health Checkup',
        price: 1299,
        originalPrice: 1999,
        discountPercentage: 35,
        includes: ['Blood Test', 'Urine Test', 'ECG', 'X-Ray Chest', 'Ultrasound Abdomen'],
        preparation: '8 hours fasting required',
        reportsIn: '24 hours',
        fastingRequired: true,
        homeSampleCollection: true,
        totalTests: 85,
        isActive: true,
        tags: ['popular', 'comprehensive'],
        image: '/images/health-checkup.jpg',
        ratings: 4.8,
        numOfReviews: 120
    },
    {
        _id: '2',
        name: 'Diabetes Care Package',
        description: 'Comprehensive diabetes monitoring panel with all essential parameters.',
        category: 'Special Care',
        price: 899,
        originalPrice: 1299,
        discountPercentage: 31,
        includes: ['Fasting Blood Sugar', 'Post Prandial', 'HbA1c', 'Lipid Profile'],
        preparation: '8 hours fasting required',
        reportsIn: '12 hours',
        fastingRequired: true,
        homeSampleCollection: true,
        totalTests: 12,
        isActive: true,
        tags: ['diabetes', 'popular'],
        image: '/images/diabetes.jpg',
        ratings: 4.6,
        numOfReviews: 85
    },
    {
        _id: '3',
        name: 'Thyroid Function Test',
        description: 'Complete thyroid function assessment with T3, T4, and TSH.',
        category: 'Vital Organ',
        price: 699,
        originalPrice: 999,
        discountPercentage: 30,
        includes: ['T3', 'T4', 'TSH'],
        preparation: 'No fasting required',
        reportsIn: '24 hours',
        fastingRequired: false,
        homeSampleCollection: true,
        totalTests: 3,
        isActive: true,
        tags: ['thyroid', 'hormones'],
        image: '/images/thyroid.jpg',
        ratings: 4.7,
        numOfReviews: 95
    }
];

const mockCategories = [
    {
        _id: '1',
        name: 'Health Checkup',
        description: 'Comprehensive health assessment packages',
        type: 'health-package',
        imagePath: '/images/health-checkup.jpg',
        isActive: true,
        isFeatured: true,
        isSelected: true
    },
    {
        _id: '2',
        name: 'Special Care',
        description: 'Specialized care packages for specific conditions',
        type: 'special-care',
        imagePath: '/images/special-care.jpg',
        isActive: true,
        isFeatured: true,
        isSelected: true
    },
    {
        _id: '3',
        name: 'Vital Organ',
        description: 'Organ-specific health assessments',
        type: 'vital-organ',
        imagePath: '/images/vital-organ.jpg',
        isActive: true,
        isFeatured: false,
        isSelected: true
    }
];

const mockBanners = [
    {
        _id: '1',
        title: 'Summer Health Checkup Offer',
        description: 'Get 30% off on all health checkup packages',
        imageUrl: '/images/banner1.jpg',
        link: '/checkups',
        isActive: true,
        position: 'main'
    },
    {
        _id: '2',
        title: 'Women Care Package',
        description: 'Special packages for women\'s health',
        imageUrl: '/images/banner2.jpg',
        link: '/woman-care',
        isActive: true,
        position: 'main'
    }
];

const mockLocations = [
    {
        _id: '1',
        pincode: '560001',
        city: 'Bangalore',
        state: 'Karnataka',
        area: 'Central Bangalore',
        isServiceable: true
    },
    {
        _id: '2',
        pincode: '560037',
        city: 'Bangalore',
        state: 'Karnataka',
        area: 'East Bangalore',
        isServiceable: true
    }
];

// Mock routes
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'FutureLabs API is running (Mock Mode)',
        timestamp: new Date().toISOString()
    });
});

// Tests routes
app.get('/api/v1/tests', (req, res) => {
    res.status(200).json({
        success: true,
        count: mockTests.length,
        data: mockTests
    });
});

app.get('/api/v1/tests/:id', (req, res) => {
    const test = mockTests.find(t => t._id === req.params.id);
    if (!test) {
        return res.status(404).json({
            success: false,
            message: 'Test not found'
        });
    }
    res.status(200).json({
        success: true,
        data: test
    });
});

app.get('/api/v1/tests/category/:category', (req, res) => {
    const tests = mockTests.filter(t => t.category === req.params.category);
    res.status(200).json({
        success: true,
        count: tests.length,
        data: tests
    });
});

app.get('/api/v1/tests/selected/Special Care Packages', (req, res) => {
    const tests = mockTests.filter(t => t.category === 'Special Care');
    res.status(200).json({
        success: true,
        count: tests.length,
        data: tests
    });
});

app.get('/api/v1/tests/selected/Single Test', (req, res) => {
    res.status(200).json({
        success: true,
        count: mockTests.length,
        data: mockTests
    });
});

// Category routes
app.get('/api/v1/category', (req, res) => {
    res.status(200).json({
        success: true,
        count: mockCategories.length,
        data: mockCategories
    });
});

app.get('/api/v1/category/:id', (req, res) => {
    const category = mockCategories.find(c => c._id === req.params.id);
    if (!category) {
        return res.status(404).json({
            success: false,
            message: 'Category not found'
        });
    }
    res.status(200).json({
        success: true,
        data: category
    });
});

app.get('/api/v1/category/lessPrice/selected', (req, res) => {
    res.status(200).json({
        success: true,
        count: mockCategories.length,
        data: mockCategories
    });
});

app.get('/api/v1/category/organ/selected', (req, res) => {
    const categories = mockCategories.filter(c => c.type === 'vital-organ');
    res.status(200).json({
        success: true,
        count: categories.length,
        data: categories
    });
});

app.get('/api/v1/category/womenage/selected', (req, res) => {
    res.status(200).json({
        success: true,
        count: mockCategories.length,
        data: mockCategories
    });
});

app.get('/api/v1/category/women/selected', (req, res) => {
    res.status(200).json({
        success: true,
        count: mockCategories.length,
        data: mockCategories
    });
});

app.get('/api/v1/category/menage/selected', (req, res) => {
    res.status(200).json({
        success: true,
        count: mockCategories.length,
        data: mockCategories
    });
});

app.get('/api/v1/category/men/selected', (req, res) => {
    res.status(200).json({
        success: true,
        count: mockCategories.length,
        data: mockCategories
    });
});

app.get('/api/v1/category/lifestyle/selected', (req, res) => {
    res.status(200).json({
        success: true,
        count: mockCategories.length,
        data: mockCategories
    });
});

// Banner routes
app.get('/api/v1/banners/main', (req, res) => {
    const banners = mockBanners.filter(b => b.position === 'main');
    res.status(200).json({
        success: true,
        count: banners.length,
        data: banners
    });
});

app.get('/api/v1/banners/bottom', (req, res) => {
    res.status(200).json({
        success: true,
        count: mockBanners.length,
        data: mockBanners
    });
});

app.get('/api/v1/banners/bottom/random', (req, res) => {
    const randomBanner = mockBanners[Math.floor(Math.random() * mockBanners.length)];
    res.status(200).json({
        success: true,
        data: randomBanner
    });
});

// Location routes
app.get('/api/v1/locations/check/:pincode', (req, res) => {
    const location = mockLocations.find(l => l.pincode === req.params.pincode);
    if (!location) {
        return res.status(200).json({
            success: true,
            isServiceable: false,
            message: 'Service not available for this pincode'
        });
    }
    res.status(200).json({
        success: true,
        isServiceable: location.isServiceable,
        data: location
    });
});

// Auth routes (mock)
app.post('/api/v1/auth/register', (req, res) => {
    res.status(200).json({
        success: true,
        token: 'mock-jwt-token',
        data: {
            user: {
                _id: '123',
                name: req.body.name,
                email: req.body.email,
                role: 'user'
            }
        }
    });
});

app.post('/api/v1/auth/login', (req, res) => {
    res.status(200).json({
        success: true,
        token: 'mock-jwt-token',
        data: {
            user: {
                _id: '123',
                name: 'Mock User',
                email: req.body.email,
                role: 'user'
            }
        }
    });
});

app.get('/api/v1/auth/me', (req, res) => {
    res.status(200).json({
        success: true,
        data: {
            user: {
                _id: '123',
                name: 'Mock User',
                email: 'mock@example.com',
                role: 'user'
            }
        }
    });
});

// Cart routes (mock)
let mockCart = [];

app.get('/api/v1/cart/:userId', (req, res) => {
    const userCart = mockCart.filter(item => item.userId === req.params.userId);
    res.status(200).json({
        success: true,
        count: userCart.length,
        data: userCart
    });
});

app.post('/api/v1/cart/add', (req, res) => {
    const { userId, testId } = req.body;
    const existingItem = mockCart.find(item => item.userId === userId && item.testId === testId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        mockCart.push({
            userId,
            testId,
            quantity: 1,
            addedAt: new Date().toISOString()
        });
    }

    res.status(200).json({
        success: true,
        message: 'Item added to cart'
    });
});

app.delete('/api/v1/cart/remove', (req, res) => {
    const { userId, testId } = req.body;
    mockCart = mockCart.filter(item => !(item.userId === userId && item.testId === testId));

    res.status(200).json({
        success: true,
        message: 'Item removed from cart'
    });
});

// Catch-all handler: Send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Mock Server running on port ${PORT}`);
    console.log(`API Health Check: http://localhost:${PORT}/api/v1/health`);
});

module.exports = app;