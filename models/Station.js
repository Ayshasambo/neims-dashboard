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
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Category'
        },
              // id: {
              //   type: String
              // },
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
       product:[{
        id:{type: String},
        name: {type: String},
        quantity:{type:Number},
        tag:{type:String},
        createdAt: {
          type: Date,
          default: Date.now
        }
       }],

       areaofcoverage:[{
         type: String
       }],

       mobile:{
        type: Number
       },

       location:{
        type:String
       },

       head:{
        type: String
       },

       beneficiary: {
        men: {
          type: Number,
          default: 0
        },
        women: {
          type: Number,
          default: 0
        },
        children: {
          type: Number,
          default: 0
        }, 
      }
},
{timestamps:true}
);


module.exports = mongoose.model("Station", stationSchema);
