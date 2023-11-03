const express = require('express');
const router = express.Router();
const Productlist = require('../models/Productlist');
const Bincard = require('../models/Bincard');
const Category = require('../models/Category');
const User = require('../models/User');
const Station = require('../models/Station');
const mongoose = require('mongoose')


// create the products
router.post('/', async (req, res) => {
  const { name, quantity, station, srvnumber,  category, tag, storeofficer, verificationofficer } = req.body;
  try {
    const populatedCategory = await Category.findById(category);
    const populatedStation = await Station.findById(station);
    const populatedStoreofficer = await User.findById(storeofficer);
    const populatedVerificationofficer = await User.findById(verificationofficer);

    const newProductlist = new Productlist({
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
      storeofficer: populatedStoreofficer,
      verificationofficer: populatedVerificationofficer
    });

    await newProductlist.save();

     // Add new product to station
       populatedStation.productlist.push(newProductlist);
      
    // Update the station change property
    populatedStation.change = 'increase';

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

    // Calculate and update the station total
    let stationTotal = 0;
    for (const cat of populatedStation.category) {
      stationTotal += cat.total;
    }
    populatedStation.total = stationTotal;

    // Save the updated station
    await populatedStation.save();

    res.json(newProductlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Productlist.find().sort({createdAt:-1});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single product
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

// DELETE a product
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

// UPDATE a product
router.put('/:id', async (req, res) =>{
  try{
    const updateProductlist = await Productlist.updateOne(
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
    const products = await Productlist.find({ 'station.id': req.params.stationId });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;





// Assuming you have a route for incoming products
// router.get('/station/:stationId', async (req, res) => {
//   const stationId = req.params.stationId;
//     console.log('stationId:', stationId)
//   try {
//     // Find all products associated with the specified station
//     const products = await Productlist.find({ station: stationId });
//     console.log('products:', products)
//     if (!products) {
//       return res.status(404).json({ error: 'No products found for the specified station' });
//     }

//     res.json(products);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


module.exports = router;




