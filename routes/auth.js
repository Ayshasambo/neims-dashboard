const router = require("express").Router();
const User = require("../models/User.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// REGISTER A USER
router.post("/register", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('User already registered');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            userid: req.body.userid,
            fullname: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '24h' }); 
        res.status(201).json({ message: 'User successfully registered', token });
    } catch (err) {
        res.status(500).json(err);
    }
});

// LOG IN A USER
 router.post("/login", async (req, res) => {
    try {
         const user = await User.findOne({ email: req.body.email });
         if (!user) return res.status(401).json({ message: 'Invalid credentials' });

         const validPassword = await bcrypt.compare(req.body.password, user.password);
         if (!validPassword) return res.status(401).json({ message: 'Invalid credentials' });

         // Generate JWT token
         const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Adjust the expiration time as needed

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
         res.status(500).json(err);
        }
});

module.exports = router;
