const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  category: {
    type: String,
    enum: ['food', 'non-food', 'building materials', 'livelihood support items', 'medicaments'],
    required: true,
  },
  
});


module.exports = mongoose.model("Item", itemSchema);