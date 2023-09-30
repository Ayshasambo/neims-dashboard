const express = require('express');
const router = express.Router();
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')
const User = require('../models/User.js')

//REGISTER A USER
router.post("/", async (req, res) => {

    const user = await User.findOne({userid: req.body.userid});
    if (user) return res.status(400).send('User already registered');

   const newUser =  new User({
       userid: req.body.userid,
       name: req.body.name,
       surname: req.body.surname,
       email: req.body.email,
       password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
       
   });   
   try{
       const user = await newUser.save();
       res.status(201).json('User successfully registered');
     
   }
   catch(err){
       res.status(500).json(err);
   }
 
 });

 module.exports = router;