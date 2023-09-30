const mongoose = require('mongoose');

const userchema = new mongoose.Schema({
    name:{
        type: String
    },
    surname:{
        type: String
    },
    email:{
        type: String,
        unique: true
    },
    password:{
        type: Sring
    }
});


module.exports = mongoose.model("User", userSchema);