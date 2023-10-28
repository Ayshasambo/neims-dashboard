const express = require('express');
const router = express.Router();
const Bincard = require('../models/Bincard');
const Productlist = require('../models/Productlist');

router.post('/', async (req, res) => {
    const { productlist, quantity, reason } = req.body;
    try {
      const populatedProductlist = await Productlist.findById(productlist);
  
      console.log('productlist:',  productlist);
      if (!populatedProductlist) {
        return res.status(404).json({ error: 'One or more items not found' });
      }
  
      const newBincard = new Bincard({
       productlist: populatedProductlist,
       quantity,
       reason
      });
  
      await newBincard.save();
  
      res.json(newBincard);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  


module.exports = router