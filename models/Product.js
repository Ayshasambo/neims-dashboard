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
    }
  },
  tag:{
    type: String,
  },
  storeofficer:{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    //id:{type:String},
    firstname:{type: String}
  },
  bincard:[{
    srvnumber: String,
    movement: {
      type: String,
      default: 'restock',
    },
    quantity: Number,
    balance: Number,
    signature: {  // Include the signature field
      type: String, // Modify the type based on the signature details you're capturing
    },
  }],
},
{timestamps:true}
);

// Define pre-save middleware
productSchema.pre('save', function (next) {
  if (!this.bincard || this.bincard.length === 0) {
    
    const defaultBincard = {
      srvnumber: this.srvnumber,
      quantity: this.quantity,
      balance: this.quantity, 
      signature: `${this.storeofficer.firstname}`,   
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