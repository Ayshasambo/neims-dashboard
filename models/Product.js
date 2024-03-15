const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  srvnumber:{
    type:String
  },
  station:{
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station'
      },
      name: {
        type: String
      },
      type:{
        type:String
      }
    },
 
  category:{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
    name: {
      type: String
    },
    total:{
      type:Number
    },
    categorybreakdown:{
      type:Object
    }

  },
  tag:{
    type: String,
  },
  expiryDate:{
     type:String
  },
  storeofficer:{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    //id:{type:String},
    firstname:{type: String},
    surname:{type: String}
  },
  bincard:[{
    srvnumber: String,
    movement: {
      type: String,
      default: 'restock',
    },
    quantity: Number,
    balance: Number,
    signature: {  
      type: String, 
    },
  }],
},
{timestamps:true}
);

//pre-save middleware
productSchema.pre('save', function (next) {
  if (!this.bincard || this.bincard.length === 0) {
    
    const defaultBincard = {
      srvnumber: this.srvnumber,
      quantity: this.quantity,
      balance: this.quantity, 
      signature: `${this.storeofficer.firstname} ${this.storeofficer.surname}`,   
    };
    // Add the default bincard entry to the bincard array
    this.bincard = [defaultBincard];
  } 
  next();
});


module.exports = mongoose.model("Product", productSchema);
 // const storeOfficerId = this.storeofficer.id;
    // const storeOfficerName = this.storeofficer.firstname;
    //signature: `${this.storeofficer.firstname} ${this.storeofficer.lastname}`,