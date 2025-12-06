const User = require('../models/User');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const sendSMS = require('../utils/sendSMS');

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = async (req, res, next) => {
    try {
        const { name, email, phone, password } = req.body;

        // Create user
        const user = await User.create({
            name,
            email,
            phone,
            password
        });

        sendTokenResponse(user, 201, res);
    } catch (err) {
        console.error(err);
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = async (req, res, next) => {
    try {
        const { phone, password } = req.body;

        // Validate phone & password
        if (!phone || !password) {
            return res.status(400).json({
                success: false,
                error: 'Please provide phone and password'
            });
        }

        // Check for user
        const user = await User.findOne({ phone }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        sendTokenResponse(user, 200, res);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
};

// @desc    Logout user
// @route   GET /api/v1/auth/logout
// @access  Private
exports.logout = async (req, res, next) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        data: {}
    });
};

// @desc    Generate OTP for phone verification
// @route   POST /api/v1/auth/otp/generate
// @access  Public
exports.generateOTP = async (req, res, next) => {
    try {
        const { phone } = req.body;

        // Validate phone
        if (!phone) {
            return res.status(400).json({
                success: false,
                error: 'Please provide phone number'
            });
        }

        // Generate 6 digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Set OTP expiration (10 minutes)
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

        let user;
        try {
            // Try to access the database
            user = await User.findOne({ phone });

            if (!user) {
                // Create temporary user with phone
                user = await User.create({
                    phone,
                    otp,
                    otpExpires
                });
            } else {
                user.otp = otp;
                user.otpExpires = otpExpires;
                await user.save();
            }
        } catch (dbError) {
            // If database is not available, continue without saving to database
            console.log('Database not available, proceeding with mock mode');
        }

        // Send OTP via SMS service
        let smsResult;
        let smsSent = false;
        try {
            smsResult = await sendSMS({
                phone: phone,
                message: `Your OTP for FutureLabs is: ${otp}. This OTP is valid for 10 minutes.`
            });

            console.log('SMS sending result:', smsResult);

            // Check if SMS was sent successfully
            if (smsResult.success) {
                console.log(`OTP sent successfully to ${phone}: ${otp}`);
                smsSent = true;
            } else {
                console.error(`Failed to send OTP via SMS to ${phone}:`, smsResult.message, smsResult.error);
            }
        } catch (smsError) {
            console.error('Failed to send OTP via SMS:', smsError);
        }

        // Always return success since OTP is generated, but indicate SMS status
        res.status(200).json({
            success: true,
            message: smsSent ? 'OTP sent successfully' : 'OTP generated successfully (SMS delivery failed, but you can still login)',
            phone,
            // Include OTP in response for testing purposes (should be removed in production)
            otp: otp,
            smsSent: smsSent
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
};

// @desc    Verify OTP
// @route   POST /api/v1/auth/otp/verify
// @access  Public
exports.verifyOTP = async (req, res, next) => {
    try {
        const { phone, otp } = req.body;

        // Validate input
        if (!phone || !otp) {
            return res.status(400).json({
                success: false,
                error: 'Please provide phone and OTP'
            });
        }

        // Find user with phone
        const user = await User.findOne({ phone });

        if (!user) {
            return res.status(400).json({
                success: false,
                error: 'User not found'
            });
        }

        // Check if OTP matches and not expired
        if (user.otp !== otp) {
            return res.status(400).json({
                success: false,
                error: 'Invalid OTP'
            });
        }

        if (user.otpExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                error: 'OTP has expired'
            });
        }

        // Mark user as verified
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        sendTokenResponse(user, 200, res);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
};

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });
};