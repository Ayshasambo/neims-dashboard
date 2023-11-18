const express = require('express');
const router = express.Router();
const Station = require('../models/Station.js');
const Product = require('../models/Product.js');
const Beneficiary = require('../models/Beneficiary.js');
const Category = require('../models/Category.js');

//Create a station
router.post('/', async (req, res) => {
  const { name, type, total, category, change, product, areaofcoverage, mobile, location, head,beneficiary} = req.body;

  try {
    const populatedProduct = await Promise.all(product.map(id => Product.findById(id)));
     const populatedCategory = await Promise.all(category.map(id => Category.findById(id)));
    if (!populatedProduct) {
      return res.status(404).json({ error: 'One or more items not found' });
     }

    const newStation = new Station({
      name,
      type,
      total,
      category:populatedCategory , 
      change,
      product:populatedProduct,
      areaofcoverage,
      mobile,
      location,
      head,
      beneficiary,
    });
   
    await newStation.save();
    
    res.json(newStation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
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
        {_id: req.params.id}, 
        {$set: req.body}
      );
      res.json(updatedStation);
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Get total counts of men, women, and children per month
router.get('/:id/totalbeneficiary', async (req, res) => {
  try {
    const stationId = req.params.id;
    const station = await Station.findById(stationId);

    if (!station) {
      return res.status(404).json({ error: 'Station not found' });
    }
    
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    //const currentMonth = new Date().getMonth() + 1;
    const menCount = station.beneficiary.men;
    const womenCount = station.beneficiary.women;
    const childrenCount = station.beneficiary.children;

    res.json({
      stationId,
      menCount,
      womenCount,
      childrenCount,
      month: currentMonth,
      year:currentYear
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all stations or filter by 'type'
router.get('/', async (req, res) => {
  try {
      const query = {};
      
      // Check if 'type' query parameter is provided
      if (req.query.type) {
          query.type = req.query.type; // Add type filter to the query
      }
      
      if (req.query.name) {
        query.name = req.query.name; // Add name filter to the query
      }
      const stations = await Station.find(query).sort({ createdAt: -1 });
      res.json(stations);
  } catch (err) {
      res.status(500).json({ message: err });
  }
});


   

 module.exports = router;


