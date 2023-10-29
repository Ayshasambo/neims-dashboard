const express = require('express');
const router = express.Router();
const Station = require('../models/Station.js');
const Productlist = require('../models/Productlist.js');
const Beneficiary = require('../models/Beneficiary.js');
const Category = require('../models/Category.js');


//Create a station
router.post('/', async (req, res) => {
  console.log('Request Body:', req.body);
  const { name, type, total, category, change, productlist, beneficiaries } = req.body;

  try {
    const populatedProductlist = await Promise.all(productlist.map(id => Productlist.findById(id)));
    const populatedBeneficiaries = await Promise.all(beneficiaries.map(id => Beneficiary.findById(id)));
    const populatedCategory = await Promise.all(category.map(id => Category.findById(id)));

    
    // const stationTotal = populatedProductlist.reduce((acc, product) => {
    //   return acc + parseInt(product.quantity, 10);
    // }, 0);

    
    

    if (!populatedProductlist || !populatedBeneficiaries || !populatedCategory) {
      return res.status(404).json({ error: 'One or more items not found' });
    }
    
   

    const newStation = new Station({
      name,
      type,
      total,
      category:populatedCategory,
      change,
      productlist:populatedProductlist,
      beneficiaries:populatedBeneficiaries,
    });

    await newStation.save();

    res.json(newStation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//Get all staions
router.get('/', async (req, res) => {
    try{
     const station = await Station.find().sort({createdAt:-1});;
      res.json(station);
   }
   catch(err){
      res.json({message: err});
   }
});

//Get a station
router.get('/:id', async (req, res) => {
    try{
      const station = await Station.findById(req.params.id);
      if (!station) res.status(404).json({ message: 'station not found' });
      res.json(station);
    }
    catch(err){
          res.json({message:err})
    }
  });

  // Delete a station
router.delete('/:id', async (req, res) => {
  try {
    const deletedStation = await Station.findByIdAndDelete(req.params.id);
    if (!deletedStation) {
      return res.status(404).json({ message: 'State not found' });
    }
    res.json({ message: 'State deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
    try {
      const updatedStation = await Station.findByIdAndUpdate(
        { $set},
        { new: true }
      );
      res.json(updatedStation);
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

 module.exports = router;

 // Calculate the change based on the tag property in product list
    //const change = populatedProductlist.every(product => product.tag === 'incoming') ? 'increase' : 'decrease';
    // Calculate the total for the station
    // Calculate category totals
    // const categoryTotals = {};
    // populatedProductlist.forEach(product => {
    //   const categoryId = product.category.toString(); // Convert category ID to string
    //   categoryTotals[categoryId] = (categoryTotals[categoryId] || 0) + parseInt(product.quantity);
    // });
     // Update category totals in the Category model
    // await Promise.all(Object.keys(categoryTotals).map(async categoryId => {
    //   const total = categoryTotals[categoryId];
    //   await Category.findByIdAndUpdate(categoryId, { $inc: { total } });
    // }));