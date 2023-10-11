const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
    name: {
        type: String,
      },
    actions:[String]
},
{timestamps: true}
);


module.exports = mongoose.model("Permission", permissionSchema);