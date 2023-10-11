const express = require('express');
const router = express.Router();
const Item = require('../models/Item.js');
const checkPermissions = require('../middlewares/checkpermission.js');


// POST A NEW ITEM
router.post('/', async (req, res) => {
    const { officename, stationname, items} = req.body;
    const item = new Item({ officename, stationname, items });
  
    try {
      const newItem = await item.save();
      res.status(201).json(newItem);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

//GET ALL ITEMS
router.get('/', async (req, res) => {
    try{
     const item = await Item.find();
      res.json(item);
   }
   catch(err){
      res.json({message: err});
   }
});

//GET AN ITEM
router.get('/:id', async (req, res) => {
    try{
      const item = await Item.findById(req.params.id);
      if (!item) res.status(404).json({ message: 'item not found' });
      res.json(item);
    }
    catch(err){
          res.json({message:err})
    }
  });

  //UPDATE ITEM
router.patch('/:id', async (req, res) =>{
    try{
      const updateItem = await Item.updateOne(
        {_id: req.params.id}, 
        {$set: req.body}
      );
      res.json(updateItem)
    }
    catch(err){
      res.json({message:err})
    }
  });
  

 module.exports = router;