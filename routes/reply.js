const express = require('express');
const router = express.Router();
const Reply = require('../models/Reply');
const Report = require('../models/Report');
const User = require('../models/User');

// POST a reply to a report
router.post('/reports/:reportId/replies', async (req, res) => {
    try {
        const reportId = req.params.reportId;
        const { repliedTo, body} = req.body;

        const reportExists = await Report.findById(reportId);
        if (!reportExists) {
            return res.status(404).json({ error: 'Report not found' });
        }

        const newReply = new Reply({
            reportId,
            repliedTo,
            body,
        });

        const reply = await newReply.save();

        // Update the report with the new reply
        await Report.findByIdAndUpdate(reportId, { $push: { replies: reply._id } });

        res.status(201).json({ message: 'Reply added successfully', reply });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add reply', message: error.message });
    }
});


module.exports = router;
