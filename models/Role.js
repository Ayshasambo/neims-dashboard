const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String
      },
      permissions: {
        type: Array
       }, 
});


module.exports = mongoose.model("Role", roleSchema);