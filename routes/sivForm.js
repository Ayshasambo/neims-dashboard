const express = require('express');
const router = express.Router();
const SivForm = require('../models/SivForm');
const Bincard = require('../models/Bincard');
const Product = require('../models/Product');
const Category = require('../models/Category');
const User = require('../models/User');
const Station = require('../models/Station');
const mongoose = require('mongoose')




// create the products
router.post('/', async (req, res) => {
  const { name, quantity, station, sivnumber, product, destination, lga, category, tag, storeofficer, } = req.body;
  try {
    
    const populatedProduct = await Product.findById(product);
    const populatedStation = await Station.findById(populatedProduct.station.id) 
    const populatedCategory = await Category.findById(populatedProduct.category.id);
    const populatedStoreofficer = await User.findById(storeofficer);

   //console.log('populatedProduct:', populatedProduct)

    const newSivForm = new SivForm({
      name:populatedProduct.name,
      quantity,
      sivnumber,
      station: populatedProduct.station,
      product:populatedProduct,
      destination,
      lga,
      category: populatedProduct.category,
      tag,
      storeofficer: populatedStoreofficer,
    });

    await newSivForm.save();

    // Update product quantity
    populatedProduct.quantity -= quantity;
    populatedProduct.tag = "distributed";
    await populatedProduct.save();

    // Update stations product
    const stationProduct = populatedStation.product.find(prod => prod._id.toString() === product);
    if (!stationProduct || stationProduct.quantity < quantity) {
      return res.status(400).json({ error: 'Insufficient quantity in the station' });
    }

    if (stationProduct) {
      stationProduct.quantity -= quantity;
      stationProduct.tag = 'distributed'; 
    
    // Update station category total
    const categoryString = populatedCategory._id.toString();
    const stationCategory = populatedStation.category.find(cat => cat._id.toString() === categoryString);
    if (!stationCategory || stationCategory.total < quantity) {
      return res.status(400).json({ error: 'Insufficient quantity in the station category' });
    }

    if (stationCategory) {
      stationCategory.total -= quantity;
    } else {
      console.error('Category not found in station.');
    }
    }

    populatedStation.change = 'decrease'; 
    populatedStation.total -= quantity;   
    await populatedStation.save();
    
    res.json(newSivForm);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});








// GET all outgoing products
router.get('/', async (req, res) => {
  try {
    const products = await SivForm.find().sort({createdAt:-1});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single outgoing product
router.get('/:id', async (req, res) => {
  try {
    const product = await SivForm.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE an outgoing product
router.put('/:id', async (req, res) =>{
  try{
    const updateProduct = await SivForm.updateOne(
      {_id: req.params.id}, 
      {$set: req.body}
    );
    res.json("Outgoing product updated")
  }
  catch(err){ 
    res.json({message:'product not updated'}) 
  }
});

// DELETE outgoing product
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await SivForm.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;

