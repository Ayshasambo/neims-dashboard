const express = require('express');
const router = express.Router();
const Productlist = require('../models/Productlist');

// CREATE A NEW PRODUCT
router.post('/', async (req, res) => {
  try {
    const { itemname, quantity, date, total, reason } = req.body;
    const product = new Productlist({ itemname, quantity, date, total, reason });
  
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET ALL PRODUCTS
router.get('/', async (req, res) => {
  try {
    const products = await Productlist.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET A SINGLE PRODUCT BY ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Productlist.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE A PRODUCT BY ID
router.put('/:id', async (req, res) => {
  try {
    const { itemname, quantity, date, total, reason } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { itemname, quantity, date, total, reason },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE A PRODUCT BY ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Productlist.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
