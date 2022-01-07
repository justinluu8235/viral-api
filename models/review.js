const mongoose = require('mongoose');


//define schema
const reviewSchema = new mongoose.Schema({
    review: String, 
    createdDate: String, 
    upVotes: Number,
    userName: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    site: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Site'
    },
})

//name the model
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;

