const mongoose = require('mongoose');

const beneficiarySchema = new mongoose.Schema({
     name:{
        type:String
     },
     gender:{
        type: String
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