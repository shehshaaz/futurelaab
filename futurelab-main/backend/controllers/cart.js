const Cart = require('../models/Cart');
const User = require('../models/User');
const Test = require('../models/Test');
const asyncHandler = require('../middleware/async');

// @desc    Get user cart
// @route   GET /api/v1/cart/:userId
// @access  Public
exports.getCart = asyncHandler(async (req, res, next) => {
    const userId = req.params.userId;

    // Validate user ID
    if (!userId) {
        return res.status(400).json({
            success: false,
            error: 'User ID is required'
        });
    }

    // Find cart items for user
    const cartItems = await Cart.find({ user: userId }).populate('test');

    res.status(200).json({
        success: true,
        count: cartItems.length,
        data: cartItems
    });
});

// @desc    Add item to cart
// @route   POST /api/v1/cart/add
// @access  Public
exports.addToCart = asyncHandler(async (req, res, next) => {
    const { userId, testId } = req.body;

    // Validate input
    if (!userId || !testId) {
        return res.status(400).json({
            success: false,
            error: 'User ID and Test ID are required'
        });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({
            success: false,
            error: 'User not found'
        });
    }

    // Check if test exists
    const test = await Test.findById(testId);
    if (!test) {
        return res.status(404).json({
            success: false,
            error: 'Test not found'
        });
    }

    // Check if item already in cart
    let cartItem = await Cart.findOne({ user: userId, test: testId });

    if (cartItem) {
        // Update quantity
        cartItem.quantity += 1;
        await cartItem.save();
    } else {
        // Add new item to cart
        cartItem = await Cart.create({
            user: userId,
            test: testId,
            quantity: 1
        });
    }

    // Populate test details
    await cartItem.populate('test');

    res.status(200).json({
        success: true,
        data: cartItem
    });
});

// @desc    Remove item from cart
// @route   DELETE /api/v1/cart/remove
// @access  Public
exports.removeFromCart = asyncHandler(async (req, res, next) => {
    const { userId, testId } = req.body;

    // Validate input
    if (!userId || !testId) {
        return res.status(400).json({
            success: false,
            error: 'User ID and Test ID are required'
        });
    }

    // Find and remove cart item
    const cartItem = await Cart.findOneAndDelete({ user: userId, test: testId });

    if (!cartItem) {
        return res.status(404).json({
            success: false,
            error: 'Cart item not found'
        });
    }

    res.status(200).json({
        success: true,
        data: {}
    });
});

// @desc    Update cart item quantity
// @route   PUT /api/v1/cart/update
// @access  Public
exports.updateCartItem = asyncHandler(async (req, res, next) => {
    const { userId, testId, quantity } = req.body;

    // Validate input
    if (!userId || !testId || !quantity) {
        return res.status(400).json({
            success: false,
            error: 'User ID, Test ID, and Quantity are required'
        });
    }

    // Check if quantity is valid
    if (quantity < 1) {
        return res.status(400).json({
            success: false,
            error: 'Quantity must be at least 1'
        });
    }

    // Find and update cart item
    const cartItem = await Cart.findOneAndUpdate(
        { user: userId, test: testId },
        { quantity },
        { new: true }
    ).populate('test');

    if (!cartItem) {
        return res.status(404).json({
            success: false,
            error: 'Cart item not found'
        });
    }

    res.status(200).json({
        success: true,
        data: cartItem
    });
});

// @desc    Clear user cart
// @route   DELETE /api/v1/cart/clear/:userId
// @access  Public
exports.clearCart = asyncHandler(async (req, res, next) => {
    const userId = req.params.userId;

    // Validate user ID
    if (!userId) {
        return res.status(400).json({
            success: false,
            error: 'User ID is required'
        });
    }

    // Remove all cart items for user
    await Cart.deleteMany({ user: userId });

    res.status(200).json({
        success: true,
        data: {}
    });
});