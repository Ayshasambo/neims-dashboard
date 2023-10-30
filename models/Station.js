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
        quantity:{type:Number},
        tag:{type:String},
        category: {
              id: { type: String },
              name: { type: String },
              total: { type: Number }
            }
        
       }],
       beneficiaries:[{
        id:{type:String},
        name:{type:String},
        gender:{type: String},
        location:{type: String},
        age:{type:Number}
       }],
},
{timestamps:true}
);


module.exports = mongoose.model("Station", stationSchema);
