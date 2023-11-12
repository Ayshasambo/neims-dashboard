const mongoose = require('mongoose');

const sivNumberSchema = new mongoose.Schema({
    sivnumber:{
        type: String
    }
},
{timestamps:true}
)

module.exports = mongoose.model("SivNumber", sivNumberSchema);