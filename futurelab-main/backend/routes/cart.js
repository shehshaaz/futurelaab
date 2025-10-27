const express = require('express');
const {
    getCart,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart
} = require('../controllers/cart');

const router = express.Router();

router.route('/:userId')
    .get(getCart);

router.route('/add')
    .post(addToCart);

router.route('/remove')
    .delete(removeFromCart);

router.route('/update')
    .put(updateCartItem);

router.route('/clear/:userId')
    .delete(clearCart);

module.exports = router;