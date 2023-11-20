// 
const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
   
    name: {
      type: String
    },
    description: {
      type: String
     }, 
     permissions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Permission'
     }],
    //  permissions: [{
    //   id:{type:String},
    //   name:{type:String},
    //   actions:[String]
    //  }],
          
  },
  {timestamps: true}
  );

module.exports = mongoose.model("Role", roleSchema);
