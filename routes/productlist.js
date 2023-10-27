const express = require('express');
const router = express.Router();
const Productlist = require('../models/Productlist');
const Station = require('../models/Station');
const Category = require('../models/Category');
const User = require('../models/User');


// Step 1: Create the product list item
router.post('/', async (req, res) => {
  const { name, quantity, value, category, tag, storeofficer, verificationofficer } = req.body;

  try {
    const populatedCategory = await Category.findById(category);
    const populatedStoreofficer = await User.findById(storeofficer);
    const populatedVerificationofficer = await User.findById(verificationofficer);

    console.log('category:',  category);
    console.log('storeofficer:',  storeofficer);
    if (!populatedCategory || !populatedStoreofficer) {
      return res.status(404).json({ error: 'One or more items not found' });
    }

    const newProductlist = new Productlist({
      name,
      quantity,
      value,
      category: populatedCategory,
      tag,
      storeofficer: populatedStoreofficer,
      verificationofficer: populatedVerificationofficer
    });

    await newProductlist.save();

    res.json(newProductlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Step 2: Update the product list item with station ID
router.put('/:id', async (req, res) => {
  const productId = req.params.id;
  const stationId = req.body.station;

  try {
    const updatedProductlist = await Productlist.findByIdAndUpdate(
      productId,
      { $set: { station: stationId } },
      { new: true }
    );

    res.json(updatedProductlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});







//CREATE a new post
// router.post('/', async (req, res) => {
//   const { name, quantity, value, station, category, tag, storeofficer, verificationofficer } = req.body;
//   console.log('Tag:', tag);

//   try { 
//     const populatedStation = await Station.findById(station);
//     const populatedCategory = await Category.findById(category);
//     const populatedStoreofficer = await User.findById(storeofficer);
//     const populatedVerificationofficer = await User.findById(verificationofficer);

//     console.log('station:',  station);
//     console.log('category:',  category);
//     console.log('storeofficer:',  storeofficer);
//     if (!populatedStation || !populatedCategory || !populatedStoreofficer) {
//       return res.status(404).json({ error: 'One or more items not found' });
//     }

//     const newProductlist = new Productlist({
//       name,
//       quantity,
//       value,
//       station:populatedStation,
//       category:populatedCategory,
//       tag,
//       storeofficer:populatedStoreofficer,
//       verificationofficer:populatedVerificationofficer
//     });

//     await newProductlist.save();
    
    
    // Update the category's total count
    // if (tag === 'Incoming') {
    //   populatedCategory.total += parseInt(quantity, 10);
    // } else if (tag === 'Outgoing') {
    //   populatedCategory.total -= parseInt(quantity, 10);
    // }
    // await populatedCategory.save();

    // Update the station's change property
    // populatedStation.change = populatedCategory.total < 0 ? 'decrease' : 'increase';
    // if (req.body.tag === 'Outgoing') {
    //     populatedStation.change = 'decrease';
    // }
    // console.log(`Change property updated to: ${populatedStation.change}`);
    // await populatedStation.save();

//     res.json(newProductlist);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

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
// router.put('/:id', async (req, res) =>{
//   try{
//     const updateProductlist = await Productlist.updateOne(
//       {_id: req.params.id}, 
//       {$set: req.body}
//     );
//     res.json(updateProductlist)
//   }
//   catch(err){ 
//     res.json({message:'product not updated'}) 
//   }
// });


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
