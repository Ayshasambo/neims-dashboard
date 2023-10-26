const express = require('express');
const router = express.Router();
const Productlist = require('../models/Productlist');
const Station = require('../models/Station');
const Category = require('../models/Category');

//CREATE a new post
router.post('/', async (req, res) => {
  const { name, quantity, value, station, category, tag, storeofficer, verificationofficer } = req.body;
  console.log('Tag:', tag);

  try { 
    const populatedStation = await Station.findById(station);
    const populatedCategory = await Category.findById(category);

    console.log('station:',  station);
    console.log('category:',  category);
    if (!populatedStation || !populatedCategory) {
      return res.status(404).json({ error: 'One or more items not found' });
    }

    const newProductlist = new Productlist({
      name,
      quantity,
      value,
      station:populatedStation,
      category:populatedCategory,
      tag,
      storeofficer,
      verificationofficer
    });

    await newProductlist.save();
    
    
    // Update the category's total count
    if (tag === 'Incoming') {
      populatedCategory.total += parseInt(quantity, 10);
    } else if (tag === 'Outgoing') {
      populatedCategory.total -= parseInt(quantity, 10);
    }
    await populatedCategory.save();

    // Update the station's change property
    populatedStation.change = populatedCategory.total < 0 ? 'decrease' : 'increase';
    if (req.body.tag === 'Outgoing') {
        populatedStation.change = 'decrease';
    }
    console.log(`Change property updated to: ${populatedStation.change}`);
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

// UPDATE a product
router.patch('/:id', async (req, res) =>{
  try{
    const updateProductlist = await Productlist.updateOne(
      {_id: req.params.id}, 
      {$set: req.body}
    );
    res.json('Product Updated')
  }
  catch(err){ 
    res.json({message:err})
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

module.exports = router;
