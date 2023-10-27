const express = require('express');
const router = express.Router();
const Station = require('../models/Station.js');
//const Productlist = require('../models/Productlist.js');
const Beneficiary = require('../models/Beneficiary.js');
const Category = require('../models/Category.js');


//Step 1: Create the product list item
router.post('/', async (req, res) => {
  const { name, type, category, change, beneficiaries } = req.body;

  try {
    const populatedCategory = await Category.findById(category);
    const populatedBeneficiaries = await Beneficiary.findById(beneficiaries);
    
    //console.log('category:',  category);
    //console.log('storeofficer:',  storeofficer);
    if (!populatedCategory) {
      return res.status(404).json({ error: 'One or more items not found' });
    }

    const newStation = new Station({
            name,
            type,
            //total: stationTotal,
            category:populatedCategory,
            change,
            //productlist:populatedProductlist,
            beneficiaries:populatedBeneficiaries,
    });

    await newStation.save();

    res.json(newStation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Step 2: Update the product list item with station ID
router.put('/:id', async (req, res) => {
  const stationId = req.body.station;
  const productlistId = req.params.id;
  

  try {
    const updatedStation = await Station.findByIdAndUpdate(
      stationId,
      { $set: { station: productlistId } },
      { new: true }
    );

    res.json(updatedStation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});













//CREATE a station
// router.post('/', async (req, res) => {
//   console.log('Request Body:', req.body);
//   const { name, type, total, category, change, productlist, beneficiaries } = req.body;

//   try {
//     const populatedProductlist = await Promise.all(productlist.map(id => Productlist.findById(id)));
//     const populatedBeneficiaries = await Promise.all(beneficiaries.map(id => Beneficiary.findById(id)));
//     const populatedCategory = await Promise.all(category.map(id => Category.findById(id)));

//     // Calculate the change based on the tag property in product list
//     const change = populatedProductlist.every(product => product.tag === 'incoming') ? 'increase' : 'decrease';
  
//     // Calculate the total for the station
//     const stationTotal = populatedProductlist.reduce((acc, product) => {
//       return acc + parseInt(product.quantity, 10);
//     }, 0);

//     console.log('total:', stationTotal)
//     console.log('productlist:',  productlist)
//     console.log('beneficiaries:',  beneficiaries)
//     console.log('category:',  category)

//     // Calculate category totals
//     const categoryTotals = {};
//     populatedProductlist.forEach(product => {
//       const categoryId = product.category.toString(); // Convert category ID to string
//       categoryTotals[categoryId] = (categoryTotals[categoryId] || 0) + parseInt(product.quantity);
//     });

//     if (!populatedProductlist || !populatedBeneficiaries || !populatedCategory) {
//       return res.status(404).json({ error: 'One or more items not found' });
//     }
    
//     // Update category totals in the Category model
//     await Promise.all(Object.keys(categoryTotals).map(async categoryId => {
//       const total = categoryTotals[categoryId];
//       await Category.findByIdAndUpdate(categoryId, { $inc: { total } });
//     }));

//     const newStation = new Station({
//       name,
//       type,
//       total: stationTotal,
//       category:populatedCategory,
//       change,
//       productlist:populatedProductlist,
//       beneficiaries:populatedBeneficiaries,
//     });

//     await newStation.save();

//     res.json(newStation);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


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
//   router.put('/:id', async (req, res) =>{
//   try{
//     console.log('Request Body:', req.body);
//     const stationId = req.params.id;
//     const productIds = req.body.productlist;
//     console.log('Station ID:', stationId);
//     console.log('Product IDs:', productIds);

//     const updatedProductlist = req.body.productlist.map(id => mongoose.Types.ObjectId(id));
//     const updateStation = await Station.findByIdAndUpdate(
//       {_id: req.params.id}, 
//       {$set: { productlist: updatedProductlist }},
//       { new: true }
//     );
//     console.log('Update Result:', updateStation);

//     res.json('Station Updated')
//   }
//   catch(err){
//     res.json({message:err})
//   }
// });

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