const express = require('express');
const {
    getBanners,
    getMainBanners,
    getBottomBanners,
    getRandomBottomBanner,
    getBanner,
    createBanner,
    updateBanner,
    deleteBanner
} = require('../controllers/banners');
const { protect, authorize } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');
const Banner = require('../models/Banner');

const router = express.Router();

router.route('/')
    .get(advancedResults(Banner), getBanners)
    .post(protect, authorize('admin'), createBanner);

router.route('/main')
    .get(getMainBanners);

router.route('/bottom')
    .get(getBottomBanners);

router.route('/bottom/random')
    .get(getRandomBottomBanner);

router.route('/:id')
    .get(getBanner)
    .put(protect, authorize('admin'), updateBanner)
    .delete(protect, authorize('admin'), deleteBanner);

module.exports = router;