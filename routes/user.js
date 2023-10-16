const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const Role = require("../models/Role.js");
const Station = require("../models/Station.js");
const {verifyToken} = require("../middlewares/authjwt.js");
const checkPermissions = require("../middlewares/checkpermission");
const bcrypt = require('bcrypt');


// CREATE A NEW USER
router.post('/', verifyToken, checkPermissions('users'), async (req, res) => {
  try {
    const { fullname, surname, email, password,roleId, stationId } = req.body;
    const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const station = await Station.findById(stationId);
    const role = await Role.findById(roleId);
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Email already exists');
    }
    const user = new User({
      fullname,
      surname,
      email, 
      password:hashedPassword,
      role: {
        id: role._id,
        name: role.name
      },
      station:{
      id:station._id,
      name:station.name,}
    });
    await user.save();
    res.send("User Created successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating user');
  }
});

//GET USER
router.get("/:id", verifyToken, checkPermissions('users'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET all users
router.get('/', verifyToken, checkPermissions('users'), async (req, res) => {
  try{
     const getUsers = await User.find().sort({createdAt: -1});
      res.json(getUsers)
  }
  catch(err){
    res.status(404).json({message:err});
  }
});

 //DELETE user
 router.delete('/:id', verifyToken, checkPermissions('users'), async (req, res) =>{
  try{ 
    const removeUser = await User.deleteOne({_id: req.params.id})
    res.json("User Deleted")
  }
  catch(err){
      res.status(404).json('Error deleting user')
  }
});

 //UPDATE a user
  router.put('/:id', verifyToken, checkPermissions('users'), async (req, res) =>{
    try{
      const updateUser = await User.updateOne(
        {_id: req.params.id}, 
        {$set: req.body}
      );
      res.json(updateUser)
    }
    catch(err){
      res.status(404).json("Error updating user")
    }
  });


module.exports = router;




 

