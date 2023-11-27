const mongoose = require('mongoose');

const singleProductSchema = new mongoose.Schema({
    name:{ 
      type: String, 
      required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('SingleProduct', singleProductSchema);