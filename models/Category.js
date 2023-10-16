const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
     fooditems:{
        type: String
     },
     nonfooditems:{
        type: String
     },
     livelihood:{
        type : string
     }
},
{timestamps:true}
);

module.exports = mongoose.model("Category", categorySchema);