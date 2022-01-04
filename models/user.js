const mongoose = require('mongoose');


//define schema
const userSchema = new mongoose.Schema({
    userName: String, 
    email:String,
    firstName: String, 
    lastName: String,
    password: String,
    state: String, 
    county: String, 
    vaccinePhotoUrl: String
})

//name the model
const User = mongoose.model("User", userSchema);

module.exports = User;