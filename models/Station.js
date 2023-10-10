const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
       name:{
         type: String
       }
    
    
});


module.exports = mongoose.model("Station", stationSchema);
