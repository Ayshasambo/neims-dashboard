const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const Role = require("../models/Role.js");
const Station = require("../models/Station.js");
//const {verifyToken} = require("../middlewares/authjwt.js");
//const checkPermissions = require("../middlewares/checkpermission");
const bcrypt = require('bcrypt');


// CREATE A NEW USER
router.post('/',  async (req, res) => {
  try {
    const { firstname, surname, email, password, role, station, status } = req.body;
    const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const populatedRole = await Role.findById(role);
    const populatedStation = await Station.findById(station)
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Email already exists');
    }
    const user = new User({
      firstname,
      surname,
      email, 
      status,
      password:hashedPassword,
      role: populatedRole,
      station:populatedStation,
    });
    await user.save();
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating user');
  }
});

//GET USER
router.get("/:id",  async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.json(others);
  } catch (err) {
    res.status(500).json('User Not Found');
  }
});

//GET all users
router.get('/',  async (req, res) => {
  try{
     const getUsers = await User.find().sort({createdAt: -1});
     const users = getUsers.map(user => {
      const { password, ...others } = user._doc;
      return others;
    });
    res.json(users);
  }
  catch(err){
    res.status(404).json({message:err});
  }
});

 //UPDATE a user
  router.put('/:id',  async (req, res) =>{
    try{
      const updateUser = await User.updateOne(
        {_id: req.params.id}, 
        {$set: req.body}
      );
      res.json("User Updated")
      
    }
    catch(err){
      res.status(404).json("Error updating user")
    }
  });


module.exports = router;




 

