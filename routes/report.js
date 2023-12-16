const express = require('express');
const router = express.Router();
const multer = require('multer'); 
const path = require('path');
const Report = require('../models/Report');
const Station = require('../models/Station');
const User = require('../models/User');
const Reply = require('../models/Reply');

// Define multer storage
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/'); 
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); 
//     }
//   });
  
//   // Create multer instance
//   const upload = multer({ storage: storage });


// POST a report
router.post('/',  async (req, res) => {
  try {
    const { state, lga, community, natureofdisaster, dateofoccurence, datereported,  
      natureofdamage,  numberofaffectedpersons, numberofhouseholdaffected, numberofmen, numberofwomen, numberofchildren, 
      numberofhousescompletelydamaged, numberofhousespartiallydamaged, numberofinjured, numberofdeath,  approved, longitude, latitude, station} = req.body;
    //const images = req.files.map(file => file.path); 
    const populatedStation = await Station.findById(station);
    //const populatedSentTo = await User.findById(sentTo); 


    const newReport = new Report({ 
      state, 
      lga, 
      community, 
      natureofdisaster, 
      dateofoccurence, 
      datereported, 
      natureofdamage,  
      numberofaffectedpersons, 
      numberofhouseholdaffected, 
      numberofmen, 
      numberofwomen, 
      numberofchildren, 
      numberofhousescompletelydamaged, 
      numberofhousespartiallydamaged, 
      numberofinjured, 
      numberofdeath, 
      //assessmentteam,
      //images,
      // sentTo:{
      //   id:populatedSentTo ._id,
      //   firstname:populatedSentTo.firstname,
      //   surname:populatedSentTo.surname
      // },  
      // from:{
      //   id:user._id,
      //   firstname:user.firstname,
      //   surname:user.surname,
      // },
      approved,
      longitude,
      latitude,
      station:{
        id:populatedStation._id, 
        name:populatedStation.name
      } 
    });
    await newReport.save();
    
    res.status(201).json(newReport);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting report', error: error.message });
  }
});


// GET all reports
router.get('/', async (req, res) => {
  try {
    const query = {};

    // if (req.query.stationName) {
    //   query['station.name'] = req.query.stationName;
    // }

    // if (req.query.stationType) {
    //   query['station.type'] = req.query.stationType;
    // }

    // if (req.query.sentTo) {
    //   query['sentTo.firstname'] = req.query.sentTo;
    // }
    
    // if (req.query.sentTo) {
    //   query['sentTo.surname'] = req.query.sentTo;
    // }

    if (req.query.approved) {
      query.approved = req.query.approved === 'true'; 
    }

    const reports = await Report.find(query).sort({ createdAt: -1 });

    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
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

//UPDATE reports
router.put('/:id',  async (req, res) =>{
  try{
    const updateReport = await Report.updateOne(
      {_id: req.params.id}, 
      {$set: req.body}
    );
    res.json("Report Updated")
  }
  catch(err){
    res.json({message:err})
  }
});


// DELETE a report
router.delete('/:id', async (req, res) => {
  try {
    const deletedReport = await Report.findByIdAndDelete(req.params.id);
    if (!deletedReport) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.json({ message: 'Report deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//Post Reply
// router.post('/:reportId/reply/:userId', async (req, res) => {
//   try {
//       const reportId = req.params.reportId; 
//       const { body } = req.body; 
//       const userId = req.params.userId;
//       const user = await User.findById(userId);
//       console.log('User ID:', userId);
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
      
//       const newReply = new Reply({
//           repliedTo:{
//             id:user._id,
//             firstname:user.firstname,
//             surname:user.surname
//           }, 
//           body
//       });

//       const savedReply = await newReply.save();

//       await Report.findByIdAndUpdate(reportId, { $push: { replies: savedReply._id } });

//       res.json(savedReply);
//   } catch (error) {
//       res.status(500).json({ error: 'Failed to add a reply' });
//   }
// });

// router.get('/:reportId/replies', async (req, res) => {
//   try {
//     const reportId = req.params.reportId;
//     const replies = await Reply.find({ reportId }).populate({
//       path: 'repliedBy', 
//       select: 'firstname surname ' 
//     });

//     res.status(200).json({ replies });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch replies' });
//   }
// });

// // POST a forward for a report
// router.post('/:reportId/forwardTo/:userId', async (req, res) => {
//   try {
//     const reportId = req.params.reportId;
//     const userId = req.params.userId;

//     const report = await Report.findById(reportId);
//     if (!report) {
//       return res.status(404).json({ error: 'Report not found' });
//     }
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     report.forwardTo.push(userId);
//     await report.save();

//     res.status(200).json({ message: 'Report forwarded successfully' , report});
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to forward report' });
//   }
// });



module.exports = router;