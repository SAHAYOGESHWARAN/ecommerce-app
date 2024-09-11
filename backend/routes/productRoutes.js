const express = require('express');
const { check } = require('express-validator');
const { getProducts, createProduct } = require('../controllers/productController');
const upload = require('../middleware/uploadMiddleware'); // Image upload middleware

const router = express.Router();

// Get Products Route with Pagination and Filtering
router.get('/', getProducts);

// Create Product Route with Validation and Image Upload
router.post(
  '/',
  upload.single('image'), // Use multer to handle image uploads
  [
    check('name', 'Name is required').notEmpty(),
    check('price', 'Price must be a number').isNumeric(),
    check('description', 'Description is required').notEmpty(),
    check('category', 'Category is required').notEmpty(),
  ],
  createProduct
);

module.exports = router;
