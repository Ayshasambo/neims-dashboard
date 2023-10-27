const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Station = require('../models/Station');

// CREATE a new category
// router.post('/', async (req, res) => {
//     try {
//       const {name, total, color} = req.body;
//       const category = new Category({ name, total, color });
    
//       const newCategory = await category.save();
//       res.status(201).json(newCategory);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   });


router.post('/', async (req, res) => {
  const { name, total, station } = req.body;
  try { 
    const populatedStation = await Station.findById(station);

    console.log('station:',  station);

    if (!populatedStation) {
      return res.status(404).json({ error: 'One or more items not found' });
    }

    const newCategory = new Category({
      name,
      total,
      station:populatedStation,
    });

    await newCategory.save();

    res.json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


  // GET all categories
router.get('/', async (req, res) => {
    try {
      const category = await Category.find().sort({createdAt:-1});
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// GET a single category
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

 //UPDATE category
 router.put('/:id', async (req, res) =>{
    try{
      const updateCategory = await Category.updateOne(
        {_id: req.params.id}, 
        {$set: req.body}
      );
      res.json('Category Updated')
    }
    catch(err){ 
      res.json({message:err})
    }
  });

  // DELETE A PRODUCT
router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

  module.exports = router;