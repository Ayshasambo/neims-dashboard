const mongoose = require('mongoose');

const bincardSchema = new mongoose.Schema({
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    srvnumber:{
      type: String
    },
    movement:{
      type:String
    },
    quantity:{
      type:Number
    },
    balance:{
      type:Number
    }
   
  }, {timestamps:true});
  
  module.exports = mongoose.model("Bincard", bincardSchema);
  
  