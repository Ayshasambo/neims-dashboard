const mongoose = require('mongoose');

const srvSchema = new mongoose.Schema({
    Articles:{
        type:String
    },
    denominationqty:{
        type: String
    },
    quantityreceived:{
        type: String
    },
    value:{
        type: String
    },
    item:{
        type: String
    },
    station:{
        type : String
    }
       
});


module.exports = mongoose.model("Srv", srvSchema);