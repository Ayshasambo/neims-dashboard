const mongoose = require('mongoose');

const beneficiarySchema = new mongoose.Schema({
     name:{
        type:String
     },
     individual:{
        type: String
    },
    station:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station'
    },
    location:{
        type: String
    },
    age:{
        type: Number
    }
},
{timestamps:true}
);

module.exports = mongoose.model("Beneficiary", beneficiarySchema);