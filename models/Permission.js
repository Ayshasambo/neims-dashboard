const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
    name: {
        type: String,
      },
    actions:[String]
});


module.exports = mongoose.model("Permission", permissionSchema);