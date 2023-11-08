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
  const { name, quantity, station, sivnumber, product, goingto, lga, category, tag, storeofficer, } = req.body;
  try {
    const populatedCategory = await Category.findById(category);
    const populatedStation = await Station.findById(station)
    const populatedProduct = await Product.findById(product);
    const populatedStoreofficer = await User.findById(storeofficer);

   console.log('populatedProduct:', populatedProduct)

    const newSivForm = new SivForm({
      name,
      quantity,
      sivnumber,
      station: populatedStation,
      product:populatedProduct,
      goingto,
      lga,
      category: populatedCategory,
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

      // If items quantity is 0, decrement category total
      if (stationProduct.quantity === 0) {
        const stationCategoryId = populatedCategory._id.toString();
        const stationCategory = populatedStation.category.find(cat => cat._id.toString() === stationCategoryId);

       if (stationCategory) {
         stationCategory.total -= 1;
        }
        await populatedStation.save();
      }    
    }

    populatedStation.change = 'decrease'; 
    populatedStation.total -= quantity;   
    await populatedStation.save();
    
    // const newBincard = new Bincard({
    //   //productlist: newSivForm._id,
    //   sivnumber: newSivForm.sivnumber,
    //   //movement: destination, 
    //   quantity: newSivForm.quantity,
    //   balance: populatedProductlist.quantity,
    //   //storeofficer: newProductlist.storeofficer 
    // });
    // console.log('newBincard:', newBincard)
    // await newBincard.save();

    
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

