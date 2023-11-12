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
    //const populatedBincard = await Bincard.findById(bincard);
    const populatedStoreofficer = await User.findById(storeofficer);
    const populatedVerificationofficer = await User.findById(verificationofficer);

    const newProduct = new Product({
      name,
      quantity,
      srvnumber,
      station: {
        id: populatedStation._id,
        name: populatedStation.name,
        type: populatedStation.type
      },
      category: {
        id: populatedCategory._id,
        name: populatedCategory.name
      },
      tag,
      bincard,
      storeofficer: populatedStoreofficer,
      verificationofficer: populatedVerificationofficer
    });

    await newProduct.save();

    // Add new product to station
     populatedStation.product.push(newProduct);
      
    // Update the station change property
    populatedStation.change = 'increase';

   // Calculate total quantity of products in the station
    const totalQuantity = populatedStation.product.reduce((total, product) => {
      return total + product.quantity;
    }, 0);
    // Update the station total
    populatedStation.total = totalQuantity;

     //update the station category total
        const categoryString = populatedCategory._id.toString();
        const stationCategory = populatedStation.category.find(cat => cat._id.toString() === categoryString);
         if (stationCategory) {
        stationCategory.total += quantity;
      } else {
      console.error('Category not found in station.');
     }
    // Save the updated station
    await populatedStation.save();


    res.json({ product: newProduct});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET a single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    // .populate({
    //   path: 'station',
    //   select: 'name type',
    // });
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

// GET all products
router.get('/', async (req, res) => {
  try {
    const query = {};

    // Check if 'category' query parameter is provided
    if (req.query.category) {
      query['category.name'] = req.query.category;
    }

    // Check if 'station' query parameter is provided
    if (req.query.station) {
      query['station.name'] = req.query.station;
    }

     // Check if 'station' query parameter is provided
     if (req.query.station) {
      query['station.type'] = req.query.station;
    }

    if (req.query.month) {
      const startOfMonth = new Date(req.query.month);
      const endOfMonth = new Date(startOfMonth);
      endOfMonth.setMonth(endOfMonth.getMonth() + 1);

      query.createdAt = {
        $gte: startOfMonth,
        $lt: endOfMonth,
      };
    }
    // Add more parameters as needed
    const products = await Product.find(query).sort({ createdAt: -1 });
    
     // Calculate the total quantity for the specified month
     const total = products.reduce((total, product) => {
      return total + product.quantity;
    }, 0);

    res.json({products, total});

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router



 

