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
       category: [{
              id: {
                type: String
              },
              name: {
                type: String
              },
              color: {
                type: String
              },
              total: {
                type: Number,
                default: 0
              }
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

       areaofcoverage:[{
         type: String
       }],

       beneficiaries:{
        men:{type:Number, deault:0},
        women:{type:Number, default:0},
        children:{type:Number, default:0}
       },

},
{timestamps:true}
);


module.exports = mongoose.model("Station", stationSchema);
