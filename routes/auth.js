const router = require("express").Router();
const User = require("../models/User.js");
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');


//REGISTER A USER
router.post("/register", async (req, res) => {

    const user = await User.findOne({userid: req.body.userid});
    if (user) return res.status(400).send('User already registered');

   const newUser =  new User({
       userid: req.body.userid,
       password:  CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
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

