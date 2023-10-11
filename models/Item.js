const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  officename:{
    type:String
  },
  stationname:[{
    name:{
      type: String
    }
  }],
  items:[{
    name:{
      type: String
    }
  }] 
},
{timeStamps: true}
);


module.exports = mongoose.model("Item", itemSchema);