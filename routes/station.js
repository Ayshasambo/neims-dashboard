const express = require('express');
const router = express.Router();
const Station = require('../models/Station.js');

//NEW POST
router.post("/", async (req, res) => {
    const newStation =  new Station({
            name:req.body.name

    });
    try{
      const savedStation = await newStation.save(); 
       res.json(savedStation);
     }
     catch(err) {
         res.json({message: err})
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
router.patch('/:id', async (req, res) =>{
    try{
      const updateStation = await Station.updateOne(
        {_id: req.params.id}, 
        {$set: req.body}
      );
      res.json(updateStation)
    }
    catch(err){
      res.json({message:err})
    }
  });
  

 module.exports = router;