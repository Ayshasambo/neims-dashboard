const express = require('express');
const router = express.Router();
const SrvNumber = require('../models/SrvNumber');


//POST sivNumber
router.post('/',  async (req, res) => {
    const { srvnumber } = req.body;
    const srvNumber = new SrvNumber({ srvnumber});
  
    try {
      const newSrvNumber = await srvNumber.save();
      res.status(201).json(newSrvNumber);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


//Get all sivNumbers
router.get('/', async (req, res) => {
    try{
     const srvNumber = await SrvNumber.find().sort({createdAt:-1});;
      res.json(srvNumber);
   }
   catch(err){
      res.json({message: err});
   }
});


//GET an sivNumber
router.get('/:id', async (req, res) => {
    try {
      const srvNumber = await SrvNumber.findById(req.params.id);
      if (!srvNumber) {
        return res.status(404).json({ message: 'srv not found' });
      }
      res.json(srvNumber);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // UPDATE a product
router.put('/:id', async (req, res) =>{
    try{
      const updateSrvNumber = await SrvNumber.updateOne(
        {_id: req.params.id}, 
        {$set: req.body}
      );
      res.json("srv updated")
    }
    catch(err){ 
      res.json({message:'srv not updated'}) 
    }
  });

  // DELETE a product
router.delete('/:id', async (req, res) => {
    try {
      const deletedSrvNumber = await SrvNumber.findByIdAndDelete(req.params.id);
      if (!deletedSrvNumber) {
        return res.status(404).json({ message: 'Srv not found' });
      }
      res.json({ message: 'Srv deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  module.exports = router;