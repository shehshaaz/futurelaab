const Location = require('../models/Location');
const asyncHandler = require('../middleware/async');

// @desc    Check if service is available for pincode
// @route   GET /api/v1/locations/check/:pincode
// @access  Public
exports.checkServiceAvailability = asyncHandler(async (req, res, next) => {
    const pincode = req.params.pincode;

    // Validate pincode
    if (!pincode || pincode.length !== 6 || !/^[0-9]+$/.test(pincode)) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a valid 6-digit pincode'
        });
    }

    // Find location
    const location = await Location.findOne({ pincode });

    if (!location) {
        return res.status(200).json({
            success: true,
            available: false,
            message: 'Service not available for this pincode'
        });
    }

    if (!location.isServiceable) {
        return res.status(200).json({
            success: true,
            available: false,
            message: 'Service temporarily unavailable for this pincode'
        });
    }

    res.status(200).json({
        success: true,
        available: true,
        data: location
    });
});

// @desc    Get all locations
// @route   GET /api/v1/locations
// @access  Public
exports.getLocations = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

// @desc    Get single location
// @route   GET /api/v1/locations/:id
// @access  Public
exports.getLocation = asyncHandler(async (req, res, next) => {
    const location = await Location.findById(req.params.id);

    if (!location) {
        return res.status(404).json({
            success: false,
            error: `Location not found with id of ${req.params.id}`
        });
    }

    res.status(200).json({
        success: true,
        data: location
    });
});

// @desc    Create new location
// @route   POST /api/v1/locations
// @access  Private/Admin
exports.createLocation = asyncHandler(async (req, res, next) => {
    const location = await Location.create(req.body);

    res.status(201).json({
        success: true,
        data: location
    });
});

// @desc    Update location
// @route   PUT /api/v1/locations/:id
// @access  Private/Admin
exports.updateLocation = asyncHandler(async (req, res, next) => {
    const location = await Location.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!location) {
        return res.status(404).json({
            success: false,
            error: `Location not found with id of ${req.params.id}`
        });
    }

    res.status(200).json({
        success: true,
        data: location
    });
});

// @desc    Delete location
// @route   DELETE /api/v1/locations/:id
// @access  Private/Admin
exports.deleteLocation = asyncHandler(async (req, res, next) => {
    const location = await Location.findById(req.params.id);

    if (!location) {
        return res.status(404).json({
            success: false,
            error: `Location not found with id of ${req.params.id}`
        });
    }

    await location.remove();

    res.status(200).json({
        success: true,
        data: {}
    });
});