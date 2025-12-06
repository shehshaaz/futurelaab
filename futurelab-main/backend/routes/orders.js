const express = require('express');
const {
    getOrders,
    getMyOrders,
    getOrder,
    createOrder,
    updateOrderToPaid,
    updateOrderToDelivered,
    deleteOrder
} = require('../controllers/orders');
const { protect, authorize } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');
const Order = require('../models/Order');

const router = express.Router();

router.route('/')
    .get(protect, authorize('admin'), advancedResults(Order), getOrders)
    .post(protect, createOrder);

router.route('/myorders')
    .get(protect, getMyOrders);

router.route('/:id')
    .get(protect, getOrder)
    .delete(protect, authorize('admin'), deleteOrder);

router.route('/:id/pay')
    .put(protect, updateOrderToPaid);

router.route('/:id/deliver')
    .put(protect, authorize('admin'), updateOrderToDelivered);

module.exports = router;