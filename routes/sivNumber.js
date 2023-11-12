const express = require('express');
const router = express.Router();
const SivNumber = require('../models/SivNumber');


//POST sivNumber
router.post('/',  async (req, res) => {
    const { sivnumber } = req.body;
    const sivNumber = new SivNumber({ sivnumber});
  
    try {
      const newSivNumber = await sivNumber.save();
      res.status(201).json(newSivNumber);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


//Get all sivNumbers
router.get('/', async (req, res) => {
    try{
     const sivNumber = await SivNumber.find().sort({createdAt:-1});;
      res.json(sivNumber);
   }
   catch(err){
      res.json({message: err});
   }
});


//GET an sivNumber
router.get('/:id', async (req, res) => {
    try {
      const sivNumber = await SivNumber.findById(req.params.id);
      if (!sivNumber) {
        return res.status(404).json({ message: 'siv not found' });
      }
      res.json(sivNumber);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // UPDATE a product
router.put('/:id', async (req, res) =>{
    try{
      const updateSivNumber = await SivNumber.updateOne(
        {_id: req.params.id}, 
        {$set: req.body}
      );
      res.json("siv updated")
    }
    catch(err){ 
      res.json({message:'siv not updated'}) 
    }
  });

  // DELETE a product
router.delete('/:id', async (req, res) => {
    try {
      const deletedSivNumber = await SivNumber.findByIdAndDelete(req.params.id);
      if (!deletedSivNumber) {
        return res.status(404).json({ message: 'Siv not found' });
      }
      res.json({ message: 'Siv deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  module.exports = router;