const User = require('../models/User.js');
const Role = require("../models/Role.js");

const checkPermissions = (resource) => async (req, res, next) => {
    console.log("Checking Permissions....");
  
    try {
      // Find the user and populate their role
      const user = await User.findById(req.userId).populate('role');
      console.log(user)
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
  
      // Get the user's role and permissions
      const role = await Role.findById(user.role.id)
      const userPermissions = role.permissions;
  
      // Find the permissions for the requested resource
      const resourcePermissions = userPermissions.find(perm => perm.name === resource);
  
      if (!resourcePermissions) {
        console.log(`User does not have permissions for ${resource}`);
        return res.status(403).json({ message: 'Unauthorized - Insufficient permissions' });
      }
  
      const action = req.method.toLowerCase();
  
      if (!resourcePermissions.actions.includes(action)) {
        console.log(`User does not have permission to ${action} ${resource}`);
        return res.status(403).json({ message: 'Unauthorized - Insufficient permissions' });
      }
  
      console.log(`User has permission to ${action} ${resource}`);
      return next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error checking permissions' });
    }
  };
  module.exports = checkPermissions