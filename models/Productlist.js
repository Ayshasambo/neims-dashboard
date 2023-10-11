const mongoose = require('mongoose');

const productlistSchema = new mongoose.Schema({
  itemname: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  total: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    enum: ['restock', 'distributed'],
    required: true
  },
},
{timestamps:true}
);

module.exports = mongoose.model("Productlist", productlistSchema);