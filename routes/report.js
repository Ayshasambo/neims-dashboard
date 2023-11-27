const express = require('express');
const router = express.Router();
const multer = require('multer'); 
const path = require('path');
const Report = require('../models/Report');
const User = require('../models/User');

// Define multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); 
    }
  });
  
  // Create multer instance
  const upload = multer({ storage: storage });


// POST a report
router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const { from,subject, body, to} = req.body;
    const images = req.files.map(file => file.path); // Save image paths
    const populatedFrom = await User.findById(from);
    const populatedTo = await User.findById(to);

    const newReport = new Report({ subject, body, images, from:populatedFrom, to:populatedTo });
    await newReport.save();

    res.status(201).json({ message: 'Report submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting report', error: error.message });
  }
});

// GET reports
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reports', error: error.message });
  }
});

// GET a report
router.get('/:id', async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching report', error: error.message });
  }
});

// PUT an updated report
router.put('/:id', upload.array('images', 5), async (req, res) => {
  try {
    const { subject, body, from, to } = req.body;
    const images = req.files.map(file => file.path); // Save image paths
    const populatedFrom = await User.findById(from);
    const populatedTo = await User.findById(to);

    const updatedReport = await Report.findByIdAndUpdate(
      req.params.id,
      { subject, body, images, from: populatedFrom, to: populatedTo },
      { new: true }
    );

    if (!updatedReport) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.status(200).json({ message: 'Report updated successfully', updatedReport });
  } catch (error) {
    res.status(500).json({ message: 'Error updating report', error: error.message });
  }
});


module.exports = router;
