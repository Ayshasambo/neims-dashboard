const express = require('express');
const router = express.Router();
const Beneficiary = require('../models/Beneficiary');
const Station = require('../models/Station')
const mongoose = require('mongoose');


// CREATE a new beneficiary
router.post('/', async (req, res) => {
  const { name, individual, station, location, age } = req.body;

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
      station:populatedStation._id,
      location,
      age,
    });

     // Update the station's beneficiary counts
     if (individual === 'male') {
      populatedStation.beneficiary.men += 1; 
    } else if(individual === 'female') {
      populatedStation.beneficiary.women += 1;
    } else if (individual === 'child') {
      populatedStation.beneficiary.children += 1; 
    }
    await populatedStation.save();
    await newBeneficiary.save();

    res.json(newBeneficiary);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


  // GET all beneficiaries
router.get('/', async (req, res) => {
    try {
      const beneficiary = await Beneficiary.find().sort({createdAt:-1});
      res.json(beneficiary);
    } catch (error) {
      res.status(500).json({ message: error.message });
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

  // DELETE A PRODUCT
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
  
module.exports = router;

// station:{
      //  id: populatedStation._id,
      //  name:populatedStation.name
      // },
 // Update the station's beneficiary counts
// if (individual === 'male') {
//   await Station.findByIdAndUpdate(
//     populatedStation._id,
//     { $inc: { 'beneficiary.men': 1 } }
//   );
// } else if (individual === 'female') {
//   await Station.findByIdAndUpdate(
//     populatedStation._id,
//     { $inc: { 'beneficiary.women': 1 } }
//   );
// } else if (individual === 'child') {
//   await Station.findByIdAndUpdate(
//     populatedStation._id,
//     { $inc: { 'beneficiary.children': 1 } }
//   );
// }