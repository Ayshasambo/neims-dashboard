const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
       name:{
        type: String
       },
       type:{
        type: String
       },
       total:{
        type: Number
       },
       category:[{
        id: {type: String},
        name:{type: String},
        total:{type: Number}   
       }],
       change:{
        type : String
       },
       productlist:[{
        id:{type: String},
        name: {type: String},
        quantity:{type:String},
        tag:{type:String}
        
       }],
       beneficiaries:[{
        id:{type:String},
        gender:{type: String},
        location:{type: String}
       }],
},
{timestamps:true}
);


module.exports = mongoose.model("Station", stationSchema);
