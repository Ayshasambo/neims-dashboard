const router = require("express").Router();
const User = require("../models/User.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');




// LOG IN A USER
 router.post("/login", async (req, res) => {
    try {
         const user = await User.findOne({ email: req.body.email });
         if (!user) return res.status(401).json({ message: 'Invalid email or password' });

         const validPassword = await bcrypt.compare(req.body.password, user.password);
         if (!validPassword) return res.status(401).json({ message: 'Invalid email or password' });

          // Check the user's status
        if (user.status !== true) {
          return res.status(401).json({ message: 'Account is inactive' });
        }

         // Set user info in session
         req.session.user = user;

        

         // Generate JWT token
         const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '42h' }); 

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
         res.status(500).json(err);
        }
});


// Generate a reset token and send it to the user's email
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const resetToken = jwt.sign({ _id: user._id }, process.env.RESET_SECRET);
    
    // Configure nodemailer to send an email containing the resetToken to the user's email address
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'neimsdashboard2023@gmail.com',
        pass: process.env.MAIL_KEY,
      },
    });

    const mailOptions = {
      from: 'neimsdashboard2023@gmail.com',
      to: user.email,
      subject: 'Password Reset',
      text: `Reset your password using this token: ${resetToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Error sending email' });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Reset token sent to your email' });
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Reset the password based on the reset token
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Verify and decode the reset token
    const decoded = jwt.verify(token, process.env.RESET_SECRET);
    if (!decoded) return res.status(400).json({ message: 'Invalid or expired token' });

    // Find the user by the decoded token's ID
    const user = await User.findById(decoded._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Hash the new password and update the user's password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
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
