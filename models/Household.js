const mongoose = require('mongoose');

const householdSchema = new mongoose.Schema({
    household: { 
      type: Number, 
      default: 0 
    },
    station:{
      id: { type: String },
      name: { type: String },
      type: { type: String },
    },
    state:{ 
        type: String 
    },
    lga:{ 
        type: String
    },
   
}, { timestamps: true });

module.exports = mongoose.model('Household', householdSchema);