const mongoose = require('mongoose');

const productlistSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  srvnumber:{
    type:String
  },
  station:{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Station'
    },
    name: {
      type: String
    }
  },
  category:{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
    name: {
      type: String
    }
  },
  tag:{
    type: String,
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