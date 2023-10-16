const express = require('express');
const router = express.Router();
const Beneficiaries = require('../models/Beneficiaries');

// CREATE a new beneficiary
router.post('/', async (req, res) => {
    try {
      const { name, gender, location } = req.body;
      const beneficiaries = new Beneficiaries({ name, gender, location });
    
      const newBeneficiaries = await beneficiaries.save();
      res.status(201).json(newBeneficiaries);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // GET all beneficiaries
router.get('/', async (req, res) => {
    try {
      const beneficiaries = await Beneficiaries.find().sort({createdAt:-1});
      res.json(beneficiaries);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
module.exports = router;