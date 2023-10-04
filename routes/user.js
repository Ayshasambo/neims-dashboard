const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // Updated import
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');


//GET USER
router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USERS
router.get("/",  async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;


//REGISTER A USER
// router.post("/", async (req, res) => {

//     const user = await User.findOne({userid: req.body.userid});
//     if (user) return res.status(400).send('User already registered');

//    const newUser =  new User({
//        userid: req.body.userid,
//        name: req.body.name,
//        surname: req.body.surname,
//        email: req.body.email,
//        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
       
//    });   
//    try{
//        const user = await newUser.save();
//        res.status(201).json('User successfully registered');
     
//    }
//    catch(err){
//        res.status(500).json(err);
//    }
// });

 


 module.exports = router;