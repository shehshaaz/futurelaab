const express = require('express');
const {
    checkServiceAvailability,
    getLocations,
    getLocation,
    createLocation,
    updateLocation,
    deleteLocation
} = require('../controllers/locations');
const { protect, authorize } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');
const Location = require('../models/Location');

const router = express.Router();

router.route('/check/:pincode')
    .get(checkServiceAvailability);

router.route('/')
    .get(advancedResults(Location), getLocations)
    .post(protect, authorize('admin'), createLocation);

router.route('/:id')
    .get(getLocation)
    .put(protect, authorize('admin'), updateLocation)
    .delete(protect, authorize('admin'), deleteLocation);

module.exports = router;