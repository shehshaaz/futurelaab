const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from frontend build
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Mock data
const mockCategories = [
    {
        _id: "1",
        name: "Complete Health Checkup",
        description: "Comprehensive health screening",
        imagePath: "images/Tests/full-body.png",
        type: "health-package",
        isSelected: true,
        isFeatured: true
    },
    {
        _id: "2",
        name: "Blood Test Package",
        description: "Complete blood analysis",
        imagePath: "images/test-img/test-1.png",
        type: "health-package",
        isSelected: true,
        isFeatured: true
    },
    {
        _id: "3",
        name: "Diabetes Package",
        description: "Diabetes screening tests",
        imagePath: "images/Tests/diabaties.png",
        type: "health-package",
        isSelected: true,
        isFeatured: false
    },
    {
        _id: "4",
        name: "Heart Health Package",
        description: "Cardiovascular health tests",
        imagePath: "images/Tests/heart-cardio.png",
        type: "health-package",
        isSelected: true,
        isFeatured: false
    }
];

const mockTests = [
    {
        _id: "1",
        name: "Complete Health Checkup",
        description: "Comprehensive health screening package",
        category: "Health Packages",
        price: 1999,
        originalPrice: 2999,
        discountPercentage: 33,
        includes: [
            "Complete Blood Count (CBC)",
            "Liver Function Test (LFT)",
            "Kidney Function Test (KFT)"
        ],
        preparation: "10-12 hours fasting required",
        reportsIn: "24-48 hours",
        fastingRequired: true,
        homeSampleCollection: true,
        totalTests: 75,
        ratings: 4.8,
        numOfReviews: 120,
        tags: ["comprehensive", "full-body", "health-checkup"],
        image: "images/Tests/full-body.png",
        isActive: true
    },
    {
        _id: "2",
        name: "Women's Wellness Special",
        description: "Specialized health checkup package for women",
        category: "Women Care Packages",
        price: 2299,
        originalPrice: 3499,
        discountPercentage: 34,
        includes: [
            "Complete Blood Count (CBC)",
            "Hormonal Analysis",
            "Thyroid Profile"
        ],
        preparation: "8-10 hours fasting required",
        reportsIn: "24-48 hours",
        fastingRequired: true,
        homeSampleCollection: true,
        totalTests: 45,
        ratings: 4.7,
        numOfReviews: 95,
        tags: ["women", "wellness", "hormonal"],
        image: "images/Tests/woman.png",
        isActive: true
    }
];

const mockBanners = [
    {
        _id: "1",
        title: "Special Summer Offer",
        description: "Get 50% off on all health checkup packages",
        imageUrl: "images/banners/banner1.png",
        link: "/special-offers",
        isActive: true,
        type: "main"
    },
    {
        _id: "2",
        title: "Free Vitamin D Test",
        description: "With every complete health checkup",
        imageUrl: "images/banners/banner2.png",
        link: "/package",
        isActive: true,
        type: "bottom"
    }
];

// Mock API routes
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'FutureLabs API is running (Mock Server)',
        timestamp: new Date().toISOString()
    });
});

// Categories
app.get('/api/v1/category', (req, res) => {
    res.status(200).json({
        success: true,
        count: mockCategories.length,
        data: mockCategories
    });
});

app.get('/api/v1/category/lessPrice/selected', (req, res) => {
    const categories = mockCategories.filter(cat => cat.type === 'health-package' && cat.isSelected);
    res.status(200).json({
        success: true,
        count: categories.length,
        data: categories
    });
});

app.get('/api/v1/category/organ/selected', (req, res) => {
    const categories = mockCategories.filter(cat => cat.type === 'vital-organ' && cat.isSelected);
    res.status(200).json({
        success: true,
        count: categories.length,
        data: categories
    });
});

app.get('/api/v1/category/womenage/selected', (req, res) => {
    const categories = mockCategories.filter(cat => cat.type === 'women-care' && cat.isSelected);
    res.status(200).json({
        success: true,
        count: categories.length,
        data: categories
    });
});

app.get('/api/v1/category/women/selected', (req, res) => {
    const categories = mockCategories.filter(cat => cat.type === 'women-care' && cat.isSelected);
    res.status(200).json({
        success: true,
        count: categories.length,
        data: categories
    });
});

app.get('/api/v1/category/menage/selected', (req, res) => {
    const categories = mockCategories.filter(cat => cat.type === 'men-care' && cat.isSelected);
    res.status(200).json({
        success: true,
        count: categories.length,
        data: categories
    });
});

app.get('/api/v1/category/men/selected', (req, res) => {
    const categories = mockCategories.filter(cat => cat.type === 'men-care' && cat.isSelected);
    res.status(200).json({
        success: true,
        count: categories.length,
        data: categories
    });
});

app.get('/api/v1/category/lifestyle/selected', (req, res) => {
    const categories = mockCategories.filter(cat => cat.type === 'lifestyle' && cat.isSelected);
    res.status(200).json({
        success: true,
        count: categories.length,
        data: categories
    });
});

// Tests
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
            error: `Test not found with id of ${req.params.id}`
        });
    }
    res.status(200).json({
        success: true,
        data: test
    });
});

app.get('/api/v1/tests/category/:category', (req, res) => {
    const tests = mockTests.filter(t => t.category === req.params.category && t.isActive);
    res.status(200).json({
        success: true,
        count: tests.length,
        data: tests
    });
});

app.get('/api/v1/tests/selected/Special Care Packages', (req, res) => {
    const tests = mockTests.filter(t => t.category === 'Special Care Packages' && t.isActive);
    res.status(200).json({
        success: true,
        count: tests.length,
        data: tests
    });
});

app.get('/api/v1/tests/selected/Single Test', (req, res) => {
    const tests = mockTests.filter(t => t.category === 'Single Test' && t.isActive);
    res.status(200).json({
        success: true,
        count: tests.length,
        data: tests
    });
});

// Banners
app.get('/api/v1/banners', (req, res) => {
    res.status(200).json({
        success: true,
        count: mockBanners.length,
        data: mockBanners
    });
});

app.get('/api/v1/banners/main', (req, res) => {
    const banners = mockBanners.filter(b => b.type === 'main' && b.isActive);
    res.status(200).json({
        success: true,
        count: banners.length,
        data: banners
    });
});

app.get('/api/v1/banners/bottom', (req, res) => {
    const banners = mockBanners.filter(b => b.type === 'bottom' && b.isActive);
    res.status(200).json({
        success: true,
        count: banners.length,
        data: banners
    });
});

app.get('/api/v1/banners/bottom/random', (req, res) => {
    const banners = mockBanners.filter(b => b.type === 'bottom' && b.isActive);
    const randomBanner = banners.length > 0 ? banners[Math.floor(Math.random() * banners.length)] : null;
    res.status(200).json({
        success: true,
        data: randomBanner
    });
});

// Cart (mock)
app.get('/api/v1/cart/:userId', (req, res) => {
    res.status(200).json({
        success: true,
        data: {
            userId: req.params.userId,
            items: [],
            total: 0
        }
    });
});

app.post('/api/v1/cart/add', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Item added to cart'
    });
});

app.delete('/api/v1/cart/remove', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Item removed from cart'
    });
});

// Locations (mock)
app.get('/api/v1/locations/check/:pincode', (req, res) => {
    res.status(200).json({
        success: true,
        available: true,
        message: `Service available for pincode ${req.params.pincode}`
    });
});

// Catch-all handler: Send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Mock server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/v1/health`);
    console.log(`Frontend: http://localhost:${PORT}`);
});

module.exports = app;