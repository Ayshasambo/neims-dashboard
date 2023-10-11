const express = require('express');
const router = express.Router();
const Role = require('../models/Role.js');


// POST a new role
router.post('/', async (req, res) => {
  const { name, permissions } = req.body;
  const role = new Role({ name, permissions });

  try {
    const newRole = await role.save();
    res.status(201).json(newRole);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET all roles
router.get('/', async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


 module.exports = router;