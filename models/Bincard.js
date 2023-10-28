const mongoose = require('mongoose');

const bincardSchema = new mongoose.Schema({

    productlist: {
        id:{type:String},
        name: {type: String}
      },
      quantity: {
        type: Number
      },
      reason: {
        type: String
      }
    },
    {timestamps:true}
);

module.exports = mongoose.model("Bincard", bincardSchema);