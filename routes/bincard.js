const express = require('express');
const router = express.Router();
const Bincard = require('../models/Bincard');
const Productlist = require('../models/Productlist');

// Create a new bincard entry
router.post('/', async (req, res) => {
    const { product, ledgerfolio, movement,quantityrecieved, quantityissued, balance } = req.body;
    const bincard = new Bincard({product, ledgerfolio,movement,quantityrecieved,quantityissued,balance });
    try {
        const newBincard = await bincard.save();
        res.status(201).json(newBincard);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
});



module.exports = router;