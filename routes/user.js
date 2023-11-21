const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const Role = require("../models/Role.js");
const Station = require("../models/Station.js");
//const {verifyToken} = require("../middlewares/authjwt.js");
//const checkPermissions = require("../middlewares/checkpermission");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');



// Function to generate a random password
function generateRandomPassword() {
  const length = 10;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}


// CREATE A NEW USER
router.post('/',  async (req, res) => {
  try {
    const { firstname, surname, email, role, station, status } = req.body;
    
    // Generate a random password
    const generatedPassword = generateRandomPassword();

    // Hash the generated password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(generatedPassword, salt);
    
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
      role: {
        id:populatedRole._id,
        name:populatedRole.name
      },
      station:{
        id:populatedStation._id,
        name:populatedStation.name
      },
    });
    await user.save();

    // Send the generated password to the user's email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'neimsdashboard2023@gmail.com',
        pass: process.env.MAIL_KEY,
      },
    });

    const mailOptions = {
      from: 'neimsdashboard2023@gmail.com',
      to: email,
      subject: 'Welcome to our platform',
      text: `Welcome! Your temporary password is: ${generatedPassword}. Please change it after login.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Error sending email' });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'User created. Temporary password sent to email.' });
      }
    });
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
     const getUsers = await User.find().populate('role').sort({createdAt: -1});
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




 

