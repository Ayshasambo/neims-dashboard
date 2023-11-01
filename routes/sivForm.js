const express = require('express');
const router = express.Router();
const SivForm = require('../models/SivForm');
//const Bincard = require('../models/Bincard');
const Productlist = require('../models/Productlist');
const Category = require('../models/Category');
const User = require('../models/User');
const Station = require('../models/Station');




// create the products
router.post('/', async (req, res) => {
  const { name, quantity, station, sivnumber, productlist, goingto, category, tag, storeofficer, } = req.body;
  try {
    const populatedCategory = await Category.findById(category);
    const populatedStation = await Station.findById(station);
    const populatedProductlist = await Productlist.findById(productlist);
    const populatedStoreofficer = await User.findById(storeofficer);

    console.log('category:', category);
    console.log('station:', station);
    console.log('populatedCategory:', populatedCategory);
    console.log('populatedStation:', populatedStation);

    const newSivForm = new SivForm({
      name,
      quantity,
      sivnumber,
      station: populatedStation,
      productlist:populatedProductlist,
      goingto,
      category: populatedCategory,
      tag,
      storeofficer: populatedStoreofficer,
    });

    await newSivForm.save();

    res.json(newSivForm);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;