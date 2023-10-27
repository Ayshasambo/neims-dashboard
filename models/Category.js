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
    },
    station:{
        id: {
        type: String},
        name: {type: String}
     },

},
{timestamps:true}
);

module.exports = mongoose.model("Category", categorySchema);