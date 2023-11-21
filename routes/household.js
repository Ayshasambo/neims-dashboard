const express = require('express');
const router = express.Router();
const Household = require('../models/Household');
const Station = require('../models/Station')
const mongoose = require('mongoose');
const {verifyToken} = require("../middlewares/authjwt.js");
const checkPermissions = require("../middlewares/checkpermission");


// CREATE a new household
router.post('/',  async (req, res) => {
  const { household,station, state, lga} = req.body;

  try {
    // Find the populated station
    const populatedStation = await Station.findById(station);

    if (!populatedStation) {
      return res.status(404).json({ error: 'Station not found' });
    }

    // Create a new beneficiary
    const newHousehold= await Household({
      household,
      station:populatedStation,
      state,
      lga,
    });

    await newHousehold.save();
    //const populatedBeneficiary = await Beneficiary.findById(newBeneficiary._id).populate('station', 'name');

    res.json(newHousehold);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// GET a single Household
router.get('/:id',  async (req, res) => {
  try {
    const household = await Household.findById(req.params.id);
    if (!household) {
      return res.status(404).json({ message: 'Household not found' });
    }
    res.json(household);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

 //UPDATE Household
 router.put('/:id',  async (req, res) =>{
    try{
      const updateHousehold = await Household.updateOne(
        {_id: req.params.id}, 
        {$set: req.body}
      );
      res.json('Household Updated')
    }
    catch(err){ 
      res.json({message:err})
    }
  });

  // DELETE A Household
router.delete('/:id',   async (req, res) => {
  try {
    const deletedHousehold = await Household.findByIdAndDelete(req.params.id);
    if (!deletedHousehold) {
      return res.status(404).json({ message: 'Household not found' });
    }
    res.json({ message: 'Household deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET all Household
router.get('/',  async (req, res) => {
  try {
    const query = {};

    // Check if 'station' query parameter is provided
    if (req.query.stationName) {
      query['station.name'] = req.query.stationName;
    }

    if (req.query.stationType) {
      query['station.type'] = req.query.stationType;
    }

    if (req.query.household) {
      query.household = req.query.household;
    }

    if (req.query.state) {
      query.state = req.query.state;
    }

    if (req.query.lga) {
      query.lga = req.query.lga;
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

    const household = await Household.find(query).sort({ createdAt: -1 });

    let totalHouseholds = 0;
    household.forEach((household) => {
      totalHouseholds += household.household || 0;
    });

    res.json({
      household,
      totalHouseholds
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  
module.exports = router;




