const router = require("express").Router();
const User = require("../models/User.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




// LOG IN A USER
 router.post("/login", async (req, res) => {
    try {
         const user = await User.findOne({ email: req.body.email });
         if (!user) return res.status(401).json({ message: 'Invalid email or password' });

         const validPassword = await bcrypt.compare(req.body.password, user.password);
         if (!validPassword) return res.status(401).json({ message: 'Invalid email or password' });

         // Set user info in session
         req.session.user = user;

         // Check the user's status
        if (user.status !== 'active') {
          return res.status(401).json({ message: 'Account is inactive' });
        }

         // Generate JWT token
         const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '42h' }); 

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
         res.status(500).json(err);
        }
});

// router.get('/test-session', (req, res) => {
//     if (req.session.views) {
//       req.session.views++;
//       res.send(`Views: ${req.session.views}`);
//     } else {
//       req.session.views = 1;
//       res.send('Welcome to the session demo. Refresh to increment views.');
//     }
//   });
  

module.exports = router;
