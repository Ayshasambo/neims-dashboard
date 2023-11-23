const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    subject:{ 
      type: String, 
      required: true
    },
   body:{ 
      type: String, 
      required: true 
    },
   images:[{ 
      type: String 
   }] // Store image URLs here
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);
