const express = require('express');
const router = express.Router();
const Beneficiary = require('../models/Beneficiary');

// CREATE a new beneficiary
router.post('/', async (req, res) => {
    try {
      const { name, gender, location } = req.body;
      const beneficiary = new Beneficiary({ name, gender, location });
    
      const newBeneficiary = await beneficiary.save();
      res.status(201).json(newBeneficiary);
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