const express = require('express');
const router = express.Router();

const {
    setCategory,
    getAllCategories,
    deleteCategory
} = require('../controllers/categoryController');

const { protectAdmin } = require('../middleware/adminAuthMiddleware');


router.route('/').post(protectAdmin, setCategory).get(getAllCategories);
router.route('/:id').delete(protectAdmin, deleteCategory)

module.exports = router