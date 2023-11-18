const mongoose = require('mongoose');

const sivFormSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  category:{
    id:{type:String},
    name: {type: String},
  },
  quantity: {
    type: Number,
  },
  sivnumber:{
    type:String
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  destination:{
    type:String
  },
  lga:{
    type:String
  },
  station:{
     id: {type: String},
     name: {type: String}
  },
  tag:{
    type: String,
  },
  storeofficer:{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    firstname:{type: String}
  }
},
{timestamps:true}
);


// Define pre-save middleware for SivForm
sivFormSchema.pre('save', async function (next) {
  try {
    // Find the corresponding product based on the provided product ID
    const product = await mongoose.model('Product').findById(this.product);

    if (!product) {
      throw new Error('Product not found');
    }

    // Use the SIV number for outgoing items
    const sivNumber = this.sivnumber || product.srvnumber;

    // Create a new bincard entry for outgoing items
    const lastBincardEntry = product.bincard.length > 0 ? product.bincard[product.bincard.length - 1] : { balance: product.quantity };
    const outgoingBincard = {
      srvnumber: sivNumber,
      movement: this.destination, 
      quantity: this.quantity,
      balance: lastBincardEntry.balance - this.quantity,
      signature: `${this.storeofficer.firstname}`, 
    };

    // Add the outgoing bincard entry to the product's bincard array
    product.bincard.push(outgoingBincard);
    await product.save();
    next();
  } catch (error) {
    next(error);
  }
});


module.exports = mongoose.model("SivForm", sivFormSchema);