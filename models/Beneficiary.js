const mongoose = require('mongoose');

const beneficiarySchema = new mongoose.Schema({
     name:{
        type:String
     },
     individual:{
        type: String
    },
    station:{
        id:{type:String},
        name:{type: String},
        type:{type: String}
    },  
    state:{
        type: String
    },
    lga:{
        type: String
    },
    age:{
        type: Number
    }
},
{timestamps:true}
);

module.exports = mongoose.model("Beneficiary", beneficiarySchema);
