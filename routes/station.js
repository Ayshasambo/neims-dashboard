const express = require('express');
const router = express.Router();
const Station = require('../models/Station.js');
const Productlist = require('../models/Productlist.js');
const Beneficiary = require('../models/Beneficiary.js');
const Category = require('../models/Category.js');


//NEW POST
router.post('/', async (req, res) => {
  const { name, type, category, change, productlist, beneficiaries } = req.body;

  try {
    // const populatedProductlist = await Productlist.findById(productlist);
    // const populatedBeneficiaries = await Beneficiary.findById(beneficiaries);
    // const populatedCategory = await Category.findById(category);

    const populatedProductlist = await Promise.all(productlist.map(id => Productlist.findById(id)));
    const populatedBeneficiaries = await Promise.all(beneficiaries.map(id => Beneficiary.findById(id)));
    const populatedCategory = await Promise.all(category.map(id => Category.findById(id)));

    console.log('productlist:',  productlist)
    console.log('beneficiaries:',  beneficiaries)
    console.log('category:',  category)
    if (!populatedProductlist || !populatedBeneficiaries || !populatedCategory) {
      return res.status(404).json({ error: 'One or more items not found' });
    // if (!populatedProductlist) {
    //   return res.status(404).json({ error: 'Productlist not found' });
    }

    const newStation = new Station({
      name,
      type,
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
//GET ALL STATIONS
router.get('/', async (req, res) => {
    try{
     const station = await Station.find();
      res.json(station);
   }
   catch(err){
      res.json({message: err});
   }
});

//GET A STATION
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

  //UPDATE STATION
router.put('/:id', async (req, res) =>{
    try{
      const updateStation = await Station.updateOne(
        {_id: req.params.id}, 
        {$set: req.body}
      );
      res.json('Station Updated')
    }
    catch(err){
      res.json({message:err})
    }
  });
  

 module.exports = router;