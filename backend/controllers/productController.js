const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  const { name, price, description, imageUrl, category } = req.body;
  try {
    const product = new Product({ name, price, description, imageUrl, category });
    await product.save();
    res.status(201).json({ product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
