const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
     food:[{
        type: String
     }],
     nonfood:[{
        type: String
     }],
     livelihood:[{
        type : String
     }],
     medicaments:[{
        type: String
     }]
},
{timestamps:true}
);

module.exports = mongoose.model("Category", categorySchema);