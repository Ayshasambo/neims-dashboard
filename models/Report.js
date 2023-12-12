const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    
   // from:{
   //    id:{type:String},
   //    firstname:{type:String},
   //    surname:{type:String}
   // },
   // subject:{ 
   //    type: String, 
   // },
   state:{
      type: String
   },
   lga:{
      type:String
   },
   community:{
      type:String
   },
   natureofdisaster:{ 
      type: String, 
   },
   dateofoccurence:{
      type:Date
   },
   datereported:{
      type: Date
   },
   dateofassessment:{
      type:Date
   },
   natureofdamage:{
      type:String
   },
   numberofaffectedpersons:{
      type:Number
   },
   numberofhouseholdaffected:{
      type:Number
   },
   numberofmen:{
      type:Number
   },
   numberofwomen:{
      type:Number
   },
   numberofchildren:{
      type:Number
   },
   numberofhousescompletelydamaged:{
      type:Number
   },
   numberofhousespartiallydamaged:{
      type:Number
   },
   numberofinjured:{
      type:Number
   },
   numberofdeath:{
      type:Number
   },
   images:[{ 
      type: String 
   }],
   station:{
      id:{type:String},
      name:{type:String}
   },
   // sentTo:{
   //    id:{type:String},
   //    firstname:{type:String},
   //    surname:{type:String}
   // },
   approved:{
      type: Boolean,
      default:false
   },
// replies:[{
//    type: mongoose.Schema.Types.ObjectId,
//    ref: 'Reply'
// }],
//    forwardTo: [{
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User' 
//   }],
  assessmentteam:[String],

  longitude:{
   type: String
  },

  latitude:{
   type:String
  }

}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);
