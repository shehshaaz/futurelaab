const express = require('express');
const {
    register,
    login,
    logout,
    generateOTP,
    verifyOTP,
    getMe
} = require('../controllers/auth');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.post('/otp/generate', generateOTP);
router.post('/otp/verify', verifyOTP);
router.get('/me', protect, getMe);

module.exports = router;