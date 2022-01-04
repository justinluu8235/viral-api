const mongoose = require('mongoose');


//define schema
const waitTimeSchema = new mongoose.Schema({
    waitTime:Number,
    siteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Site'
    },
})

//name the model
const WaitTime = mongoose.model("WaitTime", waitTimeSchema);

module.exports = WaitTime;