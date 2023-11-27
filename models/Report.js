const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    
   from:{
      id:{type:String},
      firstname:{type:String},
      surname:{type:String}
   },
   subject:{ 
      type: String, 
   },
   body:{ 
      type: String, 
    },
   images:[{ 
      type: String 
   }],
   to:{
      id:{type:String},
      firstname:{type:String},
      surname:{type:String}
   }
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);
