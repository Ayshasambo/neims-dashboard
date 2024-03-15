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
      type:String
   },
   datereported:{
      type: String
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
   numberofidps:{
      type:Number
   },
   // images:[{ 
   //    type: String 
   // }],
   station:{
      id:{type:String},
      name:{type:String}
   },
   approved:{
      type: Boolean,
      default:false
   },
  longitude:{
   type: String
  },
  latitude:{
   type:String
  },
  reporttakenby:{
   type:String
  }

}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);
