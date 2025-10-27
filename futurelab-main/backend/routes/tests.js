const express = require('express');
const {
    getTests,
    getTest,
    getTestsByCategory,
    getSelectedSpecialCare,
    getSelectedSingleTests,
    createTest,
    updateTest,
    deleteTest
} = require('../controllers/tests');
const { protect, authorize } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');
const Test = require('../models/Test');

const router = express.Router();

router.route('/')
    .get(advancedResults(Test), getTests)
    .post(protect, authorize('admin'), createTest);

router.route('/category/:category')
    .get(getTestsByCategory);

router.route('/selected/Special Care Packages')
    .get(getSelectedSpecialCare);

router.route('/selected/Single Test')
    .get(getSelectedSingleTests);

router.route('/category/Exclusive')
    .get(getSelectedSingleTests);

router.route('/:id')
    .get(getTest)
    .put(protect, authorize('admin'), updateTest)
    .delete(protect, authorize('admin'), deleteTest);

module.exports = router;