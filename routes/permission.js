const express = require('express');
const router = express.Router();
const Permission = require('../models/Permission');

// POST a new permission
router.post('/', async (req, res) => {
  const { name, actions } = req.body;
  const permission = new Permission({ name, actions });

  try {
    const newPermission = await permission.save();
    res.status(201).json(newPermission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST a new permission
router.post('/', async (req, res) => {
  const { name, actions } = req.body;
  const permission = new Permission({ name, actions });

  try {
    const newPermission = await permission.save();
    res.status(201).json(newPermission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
