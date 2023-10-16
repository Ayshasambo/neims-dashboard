const mongoose = require('mongoose');

const bincardSchema = new mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Productlist',
        required: true
    },
    ledgerfolio:{
        type: String
    },
    date:{
        type:Date
    },
    movement:{
        type:String
    },
    quantityreceived:{
        type:String
    },
    quantityissued:{
        type:String
    },
    balance:{
        type:String
    }
},
{timestamps:true}
);

module.exports = mongoose.model("Bincard", bincardSchema);