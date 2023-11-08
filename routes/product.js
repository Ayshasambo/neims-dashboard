const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Bincard = require('../models/Bincard');
const Category = require('../models/Category');
const User = require('../models/User');
const Station = require('../models/Station');
const mongoose = require('mongoose')


// create the products
router.post('/', async (req, res) => {
  const { name, quantity, station, srvnumber,  category, tag, bincard, storeofficer, verificationofficer } = req.body;
  try {
    const populatedCategory = await Category.findById(category);
    const populatedStation = await Station.findById(station);
    const populatedBincard = await Bincard.findById(bincard);
    const populatedStoreofficer = await User.findById(storeofficer);
    const populatedVerificationofficer = await User.findById(verificationofficer);

    const newProduct = new Product({
      name,
      quantity,
      srvnumber,
      station: {
        id: populatedStation._id,
        name: populatedStation.name
      },
      category: {
        id: populatedCategory._id,
        name: populatedCategory.name
      },
      tag,
      // bincard:[{
      //   id: populatedBincard._id,
      // }],
      storeofficer: populatedStoreofficer,
      verificationofficer: populatedVerificationofficer
    });

    await newProduct.save();

     // Add new product to station
       populatedStation.product.push(newProduct);
      
    // Update the station change property
    populatedStation.change = 'increase';

    const stationTotal = populatedStation.total

    // Update the category total
    populatedCategory.total += 1;
    await populatedCategory.save();

    // Update the category total in the station
    const stationCategory = populatedStation.category.find(cat => cat._id && cat._id.equals(populatedCategory._id));
    if (stationCategory) {
      stationCategory.total += 1;
    } else {
      populatedStation.category.push({ category: populatedCategory._id, total: 1 });
    }

   // Calculate total quantity of products in the station
const totalQuantity = populatedStation.product.reduce((total, product) => {
  return total + product.quantity;
}, 0);

// Update the station total
populatedStation.total = totalQuantity;

// Save the updated station
await populatedStation.save();

    // Create bincard
    const newBincard = new Bincard({
      product:newProduct._id,
      srvnumber: newProduct.srvnumber,
      movement: 'restock', 
      quantity: newProduct.quantity,
      balance: newProduct.quantity,
      storeofficer: newProduct.storeofficer,
      timestamp: Date.now()
    });
    newProduct.bincard.push(newBincard);
    console.log('newBincard:', newBincard)
    await newBincard.save();

    res.json({ product: newProduct, bincard: newBincard });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({createdAt:-1});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE a product
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE a product
router.put('/:id', async (req, res) =>{
  try{
    const updateProduct = await Product.updateOne(
      {_id: req.params.id}, 
      {$set: req.body}
    );
    res.json("product updated")
  }
  catch(err){ 
    res.json({message:'product not updated'}) 
  }
});

// GET products based on station
router.get('/station/:stationId', async (req, res) => {
  try {
    const products = await Product.find({ 'station.id': req.params.stationId });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Get products based on catgories
router.get('/category/:categoryId', async (req, res) => {
  try {
    const products = await Product.find({ 'category.id': req.params.categoryId });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router



 

