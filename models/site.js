const mongoose = require('mongoose');


//define schema
const siteSchema = new mongoose.Schema({
    name: String, 
    address: String, 
    city: String, 
    state: String, 
    zipCode: Number, 
    mondayHours: String, 
    tuesdayHours: String, 
    wednesdayHours: String, 
    thursdayHours: String, 
    fridayHours: String, 
    saturdayHours: String, 
    sundayHours: String
})

//name the model
const Site = mongoose.model("Site", siteSchema);

module.exports = Site;