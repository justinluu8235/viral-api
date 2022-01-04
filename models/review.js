const mongoose = require('mongoose');


//define schema
const reviewSchema = new mongoose.Schema({
    review: String, 
    createdDate: String, 
    upVotes: Number,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    siteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Site'
    },
})

//name the model
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;