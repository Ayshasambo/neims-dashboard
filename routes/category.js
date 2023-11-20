const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const {verifyToken} = require("../middlewares/authjwt.js");
const checkPermissions = require("../middlewares/checkpermission");

//const Station = require('../models/Station');

// CREATE a new category
router.post('/',  async (req, res) => {
    try {
      const {name, color,} = req.body;
      const category = new Category({ name, color });
    
      const newCategory = await category.save();
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // GET all categories
router.get('/',  async (req, res) => {
    try {
      const category = await Category.find().sort({createdAt:-1});
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// GET a category
router.get('/:id',  async (req, res) => {
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
 router.put('/:id',  async (req, res) =>{
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
router.delete('/:id',  async (req, res) => {
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