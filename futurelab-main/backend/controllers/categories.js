const Category = require('../models/Category');
const asyncHandler = require('../middleware/async');

// Mock data for when database is not available
const mockCategories = [
    {
        _id: '1',
        name: 'Basic Health Checkup',
        type: 'health-package',
        isSelected: true,
        isActive: true,
        price: 999,
        originalPrice: 1999,
        discount: 50,
        testsIncluded: 50,
        imagePath: '/images/categories/basic-checkup.png'
    },
    {
        _id: '2',
        name: 'Comprehensive Health Checkup',
        type: 'health-package',
        isSelected: true,
        isActive: true,
        price: 1499,
        originalPrice: 2999,
        discount: 50,
        testsIncluded: 75,
        imagePath: '/images/categories/comprehensive-checkup.png'
    },
    {
        _id: '3',
        name: 'Senior Citizen Checkup',
        type: 'health-package',
        isSelected: true,
        isActive: true,
        price: 1999,
        originalPrice: 3999,
        discount: 50,
        testsIncluded: 100,
        imagePath: '/images/categories/senior-checkup.png'
    },
    {
        _id: '4',
        name: 'Cardiac Checkup',
        type: 'vital-organ',
        isSelected: true,
        isActive: true,
        price: 1299,
        originalPrice: 2499,
        discount: 48,
        testsIncluded: 40,
        imagePath: '/images/categories/cardiac-checkup.png'
    }
];

// Utility function to check if database is connected
const isDatabaseConnected = () => {
    return Category.db.readyState === 1; // 1 means connected
};

// @desc    Get all categories
// @route   GET /api/v1/category
// @access  Public
exports.getCategories = asyncHandler(async (req, res, next) => {
    if (!isDatabaseConnected()) {
        return res.status(200).json({
            success: true,
            count: mockCategories.length,
            data: mockCategories
        });
    }
    res.status(200).json(res.advancedResults);
});

// @desc    Get selected categories for less price
// @route   GET /api/v1/category/lessPrice/selected
// @access  Public
exports.getSelectedLessPrice = asyncHandler(async (req, res, next) => {
    if (!isDatabaseConnected()) {
        const filteredCategories = mockCategories.filter(cat => cat.type === 'health-package' && cat.isSelected);
        return res.status(200).json({
            success: true,
            count: filteredCategories.length,
            data: filteredCategories
        });
    }

    const categories = await Category.find({
        type: 'health-package',
        isSelected: true,
        isActive: true
    });

    res.status(200).json({
        success: true,
        count: categories.length,
        data: categories
    });
});

// @desc    Get selected categories for vital organs
// @route   GET /api/v1/category/organ/selected
// @access  Public
exports.getSelectedVitalOrgans = asyncHandler(async (req, res, next) => {
    if (!isDatabaseConnected()) {
        const filteredCategories = mockCategories.filter(cat => cat.type === 'vital-organ' && cat.isSelected);
        return res.status(200).json({
            success: true,
            count: filteredCategories.length,
            data: filteredCategories
        });
    }

    const categories = await Category.find({
        type: 'vital-organ',
        isSelected: true,
        isActive: true
    });

    res.status(200).json({
        success: true,
        count: categories.length,
        data: categories
    });
});

// @desc    Get selected categories for women age
// @route   GET /api/v1/category/womenage/selected
// @access  Public
exports.getSelectedWomenAge = asyncHandler(async (req, res, next) => {
    if (!isDatabaseConnected()) {
        const filteredCategories = mockCategories.filter(cat => cat.type === 'women-care' && cat.isSelected);
        return res.status(200).json({
            success: true,
            count: filteredCategories.length,
            data: filteredCategories
        });
    }

    const categories = await Category.find({
        type: 'women-care',
        isSelected: true,
        isActive: true
    });

    res.status(200).json({
        success: true,
        count: categories.length,
        data: categories
    });
});

// @desc    Get selected categories for women care
// @route   GET /api/v1/category/women/selected
// @access  Public
exports.getSelectedWomenCare = asyncHandler(async (req, res, next) => {
    if (!isDatabaseConnected()) {
        const filteredCategories = mockCategories.filter(cat => cat.type === 'women-care' && cat.isSelected);
        return res.status(200).json({
            success: true,
            count: filteredCategories.length,
            data: filteredCategories
        });
    }

    const categories = await Category.find({
        type: 'women-care',
        isSelected: true,
        isActive: true
    });

    res.status(200).json({
        success: true,
        count: categories.length,
        data: categories
    });
});

// @desc    Get selected categories for men age
// @route   GET /api/v1/category/menage/selected
// @access  Public
exports.getSelectedMenAge = asyncHandler(async (req, res, next) => {
    if (!isDatabaseConnected()) {
        const filteredCategories = mockCategories.filter(cat => cat.type === 'men-care' && cat.isSelected);
        return res.status(200).json({
            success: true,
            count: filteredCategories.length,
            data: filteredCategories
        });
    }

    const categories = await Category.find({
        type: 'men-care',
        isSelected: true,
        isActive: true
    });

    res.status(200).json({
        success: true,
        count: categories.length,
        data: categories
    });
});

// @desc    Get selected categories for men care
// @route   GET /api/v1/category/men/selected
// @access  Public
exports.getSelectedMenCare = asyncHandler(async (req, res, next) => {
    if (!isDatabaseConnected()) {
        const filteredCategories = mockCategories.filter(cat => cat.type === 'men-care' && cat.isSelected);
        return res.status(200).json({
            success: true,
            count: filteredCategories.length,
            data: filteredCategories
        });
    }

    const categories = await Category.find({
        type: 'men-care',
        isSelected: true,
        isActive: true
    });

    res.status(200).json({
        success: true,
        count: categories.length,
        data: categories
    });
});

// @desc    Get selected categories for lifestyle
// @route   GET /api/v1/category/lifestyle/selected
// @access  Public
exports.getSelectedLifestyle = asyncHandler(async (req, res, next) => {
    if (!isDatabaseConnected()) {
        const filteredCategories = mockCategories.filter(cat => cat.type === 'lifestyle' && cat.isSelected);
        return res.status(200).json({
            success: true,
            count: filteredCategories.length,
            data: filteredCategories
        });
    }

    const categories = await Category.find({
        type: 'lifestyle',
        isSelected: true,
        isActive: true
    });

    res.status(200).json({
        success: true,
        count: categories.length,
        data: categories
    });
});

// @desc    Get single category
// @route   GET /api/v1/category/:id
// @access  Public
exports.getCategory = asyncHandler(async (req, res, next) => {
    if (!isDatabaseConnected()) {
        const category = mockCategories.find(cat => cat._id === req.params.id);
        if (!category) {
            return res.status(404).json({
                success: false,
                error: `Category not found with id of ${req.params.id}`
            });
        }
        return res.status(200).json({
            success: true,
            data: category
        });
    }

    const category = await Category.findById(req.params.id);

    if (!category) {
        return res.status(404).json({
            success: false,
            error: `Category not found with id of ${req.params.id}`
        });
    }

    res.status(200).json({
        success: true,
        data: category
    });
});

// @desc    Create new category
// @route   POST /api/v1/category
// @access  Private/Admin
exports.createCategory = asyncHandler(async (req, res, next) => {
    if (!isDatabaseConnected()) {
        return res.status(503).json({
            success: false,
            error: 'Database not available. Cannot create category.'
        });
    }

    const category = await Category.create(req.body);

    res.status(201).json({
        success: true,
        data: category
    });
});

// @desc    Update category
// @route   PUT /api/v1/category/:id
// @access  Private/Admin
exports.updateCategory = asyncHandler(async (req, res, next) => {
    if (!isDatabaseConnected()) {
        return res.status(503).json({
            success: false,
            error: 'Database not available. Cannot update category.'
        });
    }

    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!category) {
        return res.status(404).json({
            success: false,
            error: `Category not found with id of ${req.params.id}`
        });
    }

    res.status(200).json({
        success: true,
        data: category
    });
});

// @desc    Delete category
// @route   DELETE /api/v1/category/:id
// @access  Private/Admin
exports.deleteCategory = asyncHandler(async (req, res, next) => {
    if (!isDatabaseConnected()) {
        return res.status(503).json({
            success: false,
            error: 'Database not available. Cannot delete category.'
        });
    }

    const category = await Category.findById(req.params.id);

    if (!category) {
        return res.status(404).json({
            success: false,
            error: `Category not found with id of ${req.params.id}`
        });
    }

    await category.remove();

    res.status(200).json({
        success: true,
        data: {}
    });
});