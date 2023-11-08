const mongoose = require('mongoose');

const sivFormSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  category:{
    id:{type:String},
    name: {type: String},
  },
  quantity: {
    type: Number,
  },
  sivnumber:{
    type:String
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ' Product'
  },
  goingto:{
    type:String
  },
  lga:{
    type:String
  },
  station:{
     id: {type: String},
     name: {type: String}
  },
  tag:{
    type: String,
  },
  storeofficer:{
    id:{type:String},
    name:{type: String}
  }
},
{timestamps:true}
);

module.exports = mongoose.model("SivForm", sivFormSchema);