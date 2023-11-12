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
      // type: mongoose.Schema.Types.ObjectId,
      // ref: 'Station'
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
    id:{type:String},
    name:{type: String}
  },
  verificationofficer:{
    id:{type:String},
    name:{type: String}
  },
  bincard:[{
      srvnumber: String,
      movement: {
        type: String,
        default: 'restock',
      },
      quantity: Number,
      balance: Number,
    }],
},
{timestamps:true}
);

// Define pre-save middleware
productSchema.pre('save', function (next) {
  // Check if bincard array is empty (or not provided)
  if (!this.bincard || this.bincard.length === 0) {
    // Create a default bincard entry based on the current product details
    const defaultBincard = {
      srvnumber: this.srvnumber,
      quantity: this.quantity,
      balance: this.quantity,
    };
    // Add the default bincard entry to the bincard array
    this.bincard = [defaultBincard];
  }
  next();
});


module.exports = mongoose.model("Product", productSchema);