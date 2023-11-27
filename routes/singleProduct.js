const express = require('express');
const router = express.Router();
const SingleProduct = require('../models/SingleProduct.js');

router.post("/",  async (req, res) => {
    const name  = req.body;
    const newsingleProduct = new SingleProduct(name);
     try{
       const savedsingleProduct = await newsingleProduct.save(); 
        res.json(savedsingleProduct);
      }
      catch(err) {
          res.json({message: err})
      }
  });



module.exports = router;