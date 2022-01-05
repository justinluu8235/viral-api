const mongoose = require('mongoose');


//define schema
const countyDataSchema = new mongoose.Schema({
    countyName: String, 
    code: String
})

//name the model
const CountyData = mongoose.model("CountyData", countyDataSchema);

module.exports = CountyData;

