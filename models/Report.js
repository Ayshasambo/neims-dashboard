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
   station:{
      id:{type:String},
      name:{type:String}
   },
   sentTo:{
      id:{type:String},
      firstname:{type:String},
      surname:{type:String}
   },
   replies:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reply'
   }],
   forwardTo: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' 
  }],

}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);
