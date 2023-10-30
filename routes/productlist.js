const express = require('express');
const router = express.Router();
const Productlist = require('../models/Productlist');
const Bincard = require('../models/Bincard');
const Category = require('../models/Category');
const User = require('../models/User');
const Station = require('../models/Station');


// create the products
router.post('/', async (req, res) => {
  const { name, quantity, station,  category, tag, storeofficer, verificationofficer } = req.body;
  try {
    const populatedCategory = await Category.findById(category);
    const populatedStation = await Station.findById(station);
    const populatedStoreofficer = await User.findById(storeofficer);
    const populatedVerificationofficer = await User.findById(verificationofficer);

    console.log('category:', category);
    console.log('station:', station);
    console.log('populatedCategory:', populatedCategory);
    console.log('populatedStation:', populatedStation);

    const newProductlist = new Productlist({
      name,
      quantity,
      station: populatedStation,
      category: populatedCategory,
      tag,
      storeofficer: populatedStoreofficer,
      verificationofficer: populatedVerificationofficer
    });

    await newProductlist.save();

    // Update category total
    // populatedCategory.total += parseInt(quantity, 10);
    //  await populatedCategory.save();

     // Update category in Productlist
    // newProductlist.category = populatedCategory;
    //   await newProductlist.save();

    // Add new product to station
    populatedStation.productlist.push(newProductlist);
    
    // Update station's total
    populatedStation.total += parseInt(quantity, 10);
    await populatedStation.save();

    


    res.json(newProductlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// outgoing products
router.put('/:id/outgoing', async (req, res) => {
  const productlistId = req.params.id;
  const { quantity } = req.body;

  try {
    const productlist = await Productlist.findById(productlistId);
    if (!productlist) {
      return res.status(404).json({ error: 'Product not found' });
    }
    if (quantity > productlist.quantity) {
      return res.status(400).json({ error: 'Invalid quantity' });
    }
    productlist.quantity -= quantity;

    // Create Bincard
    const newBincardentry = new Bincard({ productlist: productlistId, quantity, reason: 'Outgoing' });
    await newBincardentry.save();

    if (productlist.quantity > 0) {
      productlist.tag = 'outgoing';
    }
    await productlist.save();

   // Decrement category total
   const populatedCategory = await Category.findById(productlist.category.id);
   populatedCategory.total -= parseInt(quantity, 10);//quantity;
   await populatedCategory.save();

   // Update station total and change property
   const populatedStation = await Station.findById(productlist.station.id);
   if (populatedStation) {
     populatedStation.total -= parseInt(quantity, 10);//quantity;
     populatedStation.change = 'decrease';
     await populatedStation.save();
   }

    res.json(productlist);
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

module.exports = router;







