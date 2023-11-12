const mongoose = require('mongoose');

const srvNumberSchema = new mongoose.Schema({
    srvnumber:{
        type: String
    }
},
{timestamps:true}
)

module.exports = mongoose.model("SrvNumber", srvNumberSchema);