const express = require('express');
const router = express.Router();
const Role = require('../models/Role.js');
//const {verifyToken} = require("../middlewares/authjwt.js");


// POST a new role
router.post('/',  async (req, res) => {
  const { name, description, permissions } = req.body;
  const role = new Role({ name, description, permissions });

  try {
    const newRole = await role.save();
    res.status(201).json(newRole);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET all roles
router.get('/',  async (req, res) => {
  try {
    const roles = await Role.find().sort({createdAt: -1});
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//GET specific role
router.get('/:id',  async (req, res) => {
  try{
    const getRole = await Role.findOne({ _id: req.params.id });
    res.json(getRole)
  }
  catch(err){
    res.status(404).json({message:err})
  }
});

//DELETE role
router.delete('/:id',  async (req, res) =>{
  try{ 
    const removeRole = await Role.deleteOne({_id: req.params.id})
    res.json("Role Deleted")
  }
  catch(err){
      res.status(404).json({message:err})
  }
});

//UPDATE role
router.put('/:id',  async (req, res) =>{
  try{
    const updateRole = await Role.updateOne(
      {_id: req.params.id}, 
      {$set: req.body}
    );
    res.json("Role Updated")
  }
  catch(err){
    res.status(404).json({message:err})
  }
});



 module.exports = router;