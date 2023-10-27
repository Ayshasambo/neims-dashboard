const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type: String
    },
    total:{
        type: Number
    },
    color: {
        type: String 
    }    
},
{timestamps:true}
);

module.exports = mongoose.model("Category", categorySchema);