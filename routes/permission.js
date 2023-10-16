const express = require('express');
const router = express.Router();
const Permission = require('../models/Permission');
const {verifyToken} = require("../middlewares/authjwt.js");

// POST a new permission
router.post('/', async (req, res) => {
  const { name, actions } = req.body;
  const permission = new Permission({ name, actions });

  try {
    const newPermission = await permission.save();
    res.status(201).json(newPermission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//GET all permissions
router.get('/', verifyToken, async (req, res) => {
  try{
     const getPermissions = await Permission.find().sort({createdAt: -1});
      res.json(getPermissions)
  }
  catch(err){
    res.json({message:err});
  }
});

//GET a permission
router.get('/:id', verifyToken, async (req, res) => {
  try{
    const getPermission = await Permission.findOne({ _id: req.params.id });
    res.json(getPermission)
  }
  catch(err){
    res.status(404).json({message:err})
  }
});

//DELETE permission
router.delete('/:id', verifyToken, async (req, res) =>{
  try{ 
    const removePermission = await Permission.deleteOne({_id: req.params.id})
    res.json("Permission Deleted")
  }
  catch(err){
      res.status(404).json({message:err})
  }
});

//UPDATE prmission
router.put('/:id', verifyToken, async (req, res) =>{
  try{
    const updatePermission = await Permission.updateOne(
      {_id: req.params.id}, 
      {$set: req.body}
    );
    res.json("Permission Updated")
  }
  catch(err){
    res.status(404).json({message:err})
  }
});



module.exports = router;
