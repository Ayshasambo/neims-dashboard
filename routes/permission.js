const express = require('express');
const router = express.Router();
const Permission = require('../models/Permission');

//NEW PERMISSION
router.post("/",  async (req, res) => {
const { name, actions } = req.body;
const newPermission = new Permission({ name, actions});
 try{
   const savedPermission = await newPermission.save(); 
    res.json(savedPermission);
  }
  catch(err) {
      res.json({message: err})
  }
});

//GET PERMISSIONS
router.get('/',  async (req, res) => {
  try{
     const getPermissions = await Permission.find().sort({createdAt: -1});
      res.json(getPermissions)
  }
  catch(err){
    res.json({message:err});
  }
});

module.exports = router;
