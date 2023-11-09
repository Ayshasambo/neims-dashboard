const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
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
  },
  bincard:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Bincard'
  }],
},
{timestamps:true}
);

module.exports = mongoose.model("Product", productSchema);