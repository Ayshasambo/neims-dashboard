const express = require('express');
const router = express.Router();
const Beneficiary = require('../models/Beneficiary');
const Station = require('../models/Station')
const mongoose = require('mongoose');


// CREATE a new beneficiary
router.post('/', async (req, res) => {
  const { name, individual, station, state, lga, age } = req.body;

  try {
    // Find the populated station
    const populatedStation = await Station.findById(station);

    if (!populatedStation) {
      return res.status(404).json({ error: 'Station not found' });
    }

    // Create a new beneficiary
    const newBeneficiary = await Beneficiary({
      name,
      individual,
      station:populatedStation,
      state,
      lga,
      age,
    });

    await newBeneficiary.save();
    const populatedBeneficiary = await Beneficiary.findById(newBeneficiary._id).populate('station', 'name');

    res.json(populatedBeneficiary);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// GET a single benficiary
router.get('/:id', async (req, res) => {
  try {
    const beneficiary = await Beneficiary.findById(req.params.id);
    if (!beneficiary) {
      return res.status(404).json({ message: 'Beneficiary not found' });
    }
    res.json(beneficiary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

 //UPDATE beneficiary
 router.put('/:id', async (req, res) =>{
    try{
      const updateBeneficiary = await Beneficiary.updateOne(
        {_id: req.params.id}, 
        {$set: req.body}
      );
      res.json('Beneficiary Updated')
    }
    catch(err){ 
      res.json({message:err})
    }
  });

  // DELETE A beneficiary
router.delete('/:id', async (req, res) => {
  try {
    const deletedBeneficiary = await Beneficiary.findByIdAndDelete(req.params.id);
    if (!deletedBeneficiary) {
      return res.status(404).json({ message: 'Beneficiary not found' });
    }
    res.json({ message: 'Beneficiary deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET all beneficiaries
router.get('/', async (req, res) => {
  try {
    const query = {};

    // Check if 'station' query parameter is provided
    if (req.query.stationName) {
      query['station.name'] = req.query.stationName;
    }

    if (req.query.stationType) {
      query['station.type'] = req.query.stationType;
    }

    if (req.query.individual) {
      query.individual = req.query.individual;
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

    const beneficiaries = await Beneficiary.find(query).sort({ createdAt: -1 });

    let men = 0;
    let women = 0;
    let children = 0;

    beneficiaries.forEach((beneficiary) => {
      if (beneficiary.individual === 'male') {
        men += 1;
      } else if (beneficiary.individual === 'female') {
        women += 1;
      } else {
        children += 1;
      }
    });

    res.json({
      beneficiaries,
      men,
      women,
      children,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  
module.exports = router;




