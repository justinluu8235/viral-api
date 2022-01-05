const mongoose = require('mongoose');


//define schema
const userSchema = new mongoose.Schema({
    userName: String, 
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    timesLoggedIn: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: new Date()
    },
    state: String, 
    county: String, 
    vaccinePhotoUrl: String
})

//name the model
const User = mongoose.model("User", userSchema);

module.exports = User;