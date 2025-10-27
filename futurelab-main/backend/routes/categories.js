const express = require('express');
const {
    getCategories,
    getSelectedLessPrice,
    getSelectedVitalOrgans,
    getSelectedWomenAge,
    getSelectedWomenCare,
    getSelectedMenAge,
    getSelectedMenCare,
    getSelectedLifestyle,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categories');
const { protect, authorize } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');
const Category = require('../models/Category');

const router = express.Router();

router.route('/')
    .get(advancedResults(Category), getCategories)
    .post(protect, authorize('admin'), createCategory);

router.route('/lessPrice/selected')
    .get(getSelectedLessPrice);

router.route('/organ/selected')
    .get(getSelectedVitalOrgans);

router.route('/womenage/selected')
    .get(getSelectedWomenAge);

router.route('/women/selected')
    .get(getSelectedWomenCare);

router.route('/menage/selected')
    .get(getSelectedMenAge);

router.route('/men/selected')
    .get(getSelectedMenCare);

router.route('/lifestyle/selected')
    .get(getSelectedLifestyle);

router.route('/:id')
    .get(getCategory)
    .put(protect, authorize('admin'), updateCategory)
    .delete(protect, authorize('admin'), deleteCategory);

module.exports = router;