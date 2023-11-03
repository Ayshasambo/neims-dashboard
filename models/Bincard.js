const mongoose = require('mongoose');

const bincardSchema = new mongoose.Schema({
  
  productlist: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Station'
    },
    name: {
      type: String
    }
  },

  movement:{
    type:String
  },

  quantity: {
    type: Number
  },

  Balance: {
    type: String
  }
},
  {timestamps:true}
);

module.exports = mongoose.model("Bincard", bincardSchema);