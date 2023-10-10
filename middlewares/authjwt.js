const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];
  //const token = req.headers('authorization')

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    console.log('Received token:', token); // Log the received token
    console.log('Decoded token:', decoded); // Log the decoded token
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    req.userStation = decoded.station
    const User = require('../models/User');
    //Retrieve station information from the user model
    const user = await User.findById(decoded.userId).populate('station.id');
    req.userStation = user.station;
    
    console.log(req.userRole)
    next();
  });
}

module.exports = {verifyToken}


