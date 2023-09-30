const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userid:{
        type: String
    },
    firstname:{
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
        type: String
    }
});


module.exports = mongoose.model("User", userSchema);