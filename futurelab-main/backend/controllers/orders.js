const Order = require('../models/Order');
const User = require('../models/User');
const Test = require('../models/Test');
const asyncHandler = require('../middleware/async');

// @desc    Get all orders
// @route   GET /api/v1/orders
// @access  Private/Admin
exports.getOrders = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

// @desc    Get orders for logged in user
// @route   GET /api/v1/orders/myorders
// @access  Private
exports.getMyOrders = asyncHandler(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id });

    res.status(200).json({
        success: true,
        count: orders.length,
        data: orders
    });
});

// @desc    Get single order
// @route   GET /api/v1/orders/:id
// @access  Private
exports.getOrder = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    );

    if (!order) {
        return res.status(404).json({
            success: false,
            error: `Order not found with id of ${req.params.id}`
        });
    }

    // Make sure user is order owner or admin
    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return res.status(401).json({
            success: false,
            error: 'Not authorized to view this order'
        });
    }

    res.status(200).json({
        success: true,
        data: order
    });
});

// @desc    Create new order
// @route   POST /api/v1/orders
// @access  Private
exports.createOrder = asyncHandler(async (req, res, next) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    // Validate order items
    if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({
            success: false,
            error: 'No order items'
        });
    }

    // Create order
    const order = await Order.create({
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        user: req.user.id
    });

    res.status(201).json({
        success: true,
        data: order
    });
});

// @desc    Update order to paid
// @route   PUT /api/v1/orders/:id/pay
// @access  Private/Admin
exports.updateOrderToPaid = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return res.status(404).json({
            success: false,
            error: `Order not found with id of ${req.params.id}`
        });
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address
    };

    const updatedOrder = await order.save();

    res.status(200).json({
        success: true,
        data: updatedOrder
    });
});

// @desc    Update order to delivered
// @route   PUT /api/v1/orders/:id/deliver
// @access  Private/Admin
exports.updateOrderToDelivered = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return res.status(404).json({
            success: false,
            error: `Order not found with id of ${req.params.id}`
        });
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.status(200).json({
        success: true,
        data: updatedOrder
    });
});

// @desc    Delete order
// @route   DELETE /api/v1/orders/:id
// @access  Private/Admin
exports.deleteOrder = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return res.status(404).json({
            success: false,
            error: `Order not found with id of ${req.params.id}`
        });
    }

    await order.remove();

    res.status(200).json({
        success: true,
        data: {}
    });
});