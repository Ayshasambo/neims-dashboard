const mongoose = require('mongoose');

const singleProductSchema = new mongoose.Schema({
    name:{ 
      type: String, 
      required: true
    },
    category:{
      id:{type:String},
      name:{type:String}
    }
}, { timestamps: true });

module.exports = mongoose.model('SingleProduct', singleProductSchema);