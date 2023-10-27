const express = require('express');
const router = express.Router();
const Station = require('../models/Station.js');
const Productlist = require('../models/Productlist.js');
const Beneficiary = require('../models/Beneficiary.js');
const Category = require('../models/Category.js');
const mongoose = require('mongoose');



//CREATE a station
router.post('/', async (req, res) => {
  console.log('Request Body:', req.body);
  const { name, type, total, category, change, productlist, beneficiaries } = req.body;

  try {
    
    const populatedProductlist = await Promise.all(productlist.map(id => Productlist.findById(id)));
    const populatedBeneficiaries = await Promise.all(beneficiaries.map(id => Beneficiary.findById(id)));
    const populatedCategory = await Promise.all(category.map(id => Category.findById(id)));

    // Calculate the change based on the tag property in product list
    const change = populatedProductlist.every(product => product.tag === 'incoming') ? 'increase' : 'decrease';
  
    // Calculate the total for the station
    //const stationTotal = populatedCategory.reduce((acc, cat) => acc + cat.total, 0);
    const stationTotal = populatedProductlist.reduce((acc, product) => acc + product.quantity, 0);
    // const stationTotal = populatedProductlist.reduce((acc, product) => {
    //   return acc + product.quantity;
    // }, 0);

    console.log('total:', stationTotal)
    console.log('productlist:',  productlist)
    console.log('beneficiaries:',  beneficiaries)
    console.log('category:',  category)
    if (!populatedProductlist || !populatedBeneficiaries || !populatedCategory) {
      return res.status(404).json({ error: 'One or more items not found' });
    }

    const newStation = new Station({
      name,
      type,
      total: stationTotal,
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
//GET all staions
router.get('/', async (req, res) => {
    try{
     const station = await Station.find().sort({createdAt:-1});;
      res.json(station);
   }
   catch(err){
      res.json({message: err});
   }
});

//GET a station
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
  

  //UPDATE a station
  router.put('/:id', async (req, res) =>{
  try{
    console.log('Request Body:', req.body);
    const updatedProductlist = req.body.productlist.map(id => mongoose.Types.ObjectId(id));

    const updateStation = await Station.updateOne(
      {_id: req.params.id}, 
      {$set: { productlist: updatedProductlist }}
    );

    res.json('Station Updated')
  }
  catch(err){
    res.json({message:err})
  }
});


  //UPDATE a station
// router.put('/:id/productlist', async (req, res) =>{
//     try{
//       const updateStation = await Station.updateOne(
//         req.params.id,
//         { productlist: req.body.productlist },
//         { new: true }
//       );
//       res.json('Station Updated')
//     }
//     catch(err){
//       res.json({message:err})
//     }
//   });


  // DELETE a station
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
  

 module.exports = router;