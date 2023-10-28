const mongoose = require('mongoose');

const productlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  value: {
    type: String,
  },
  // station:{
  //    id: {type: String},
  //    name: {type: String}
  // },
  category:{
    id:{type:String},
    name: {type: String}
  },
  tag:{
    type: String,
    required: true
  },
  storeofficer:{
    id:{type:String},
    name:{type: String}
  },
  verificationofficer:{
    id:{type:String},
    name:{type: String}
  }
},
{timestamps:true}
);

module.exports = mongoose.model("Productlist", productlistSchema);