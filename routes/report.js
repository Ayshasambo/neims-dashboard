const express = require('express');
const router = express.Router();
const multer = require('multer'); // For handling file uploads
const path = require('path');
//const uploadsPath = path.join(__dirname, '..', 'uploads');
const Report = require('../models/Report');

// Define multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Define your upload directory
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Rename the file if needed
    }
  });
  
  // Create multer instance
  const upload = multer({ storage: storage });


// POST route to create a new report
router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const { subject, body } = req.body;
    const images = req.files.map(file => file.path); // Save image paths

    const newReport = new Report({ subject, body, images });
    await newReport.save();

    res.status(201).json({ message: 'Report submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting report', error: error.message });
  }
});

// GET route to fetch all reports
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reports', error: error.message });
  }
});

// GET route to fetch a single report by ID
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

module.exports = router;
