const express = require('express');
const router = express.Router();
const Role = require('../models/Role.js');

//NEW POST
router.post("/", async (req, res) => {
    const newRole =  new Role({
     name:req.body.name
    });
    try{
      const savedRole = await newRole.save(); 
       res.json(savedRole);
     }
     catch(err) {
         res.json({message: err})
     }
 });

 module.exports = router;