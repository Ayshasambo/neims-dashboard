const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type: String
    },
    color: {
        type: String 
    },
    total:{
        type: Number,
        default:0
    },
    categorybreakdown:{
        type: Object,
        default:{}
    }
},
{timestamps:true}
);

module.exports = mongoose.model("Category", categorySchema);

   