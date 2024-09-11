const Product = require('../models/Product');
const { validationResult } = require('express-validator');

// Get Products with Pagination and Filtering
exports.getProducts = async (req, res) => {
  const { page = 1, limit = 10, category } = req.query;

  try {
    // Build query with optional category filter
    const query = category ? { category } : {};

    // Get products with pagination
    const products = await Product.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // Get total number of products
    const count = await Product.countDocuments(query);

    res.json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create Product with Validation and Image Upload Handling
exports.createProduct = async (req, res) => {
  // Validate incoming data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, price, description, category } = req.body;
  let imageUrl = '';

  try {
    // Handle image file if uploaded
    if (req.file) {
      imageUrl = req.file.path; // Assuming image path is saved
    }

    // Create new product
    const product = new Product({
      name,
      price,
      description,
      imageUrl,
      category,
    });

    await product.save();

    res.status(201).json({
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
