const mongoose = require('mongoose');


//define schema
const reviewSchema = new mongoose.Schema({
    review: String, 
    createdDate: String, 
    upVotes: Number,
    upVoteArr: Array,
    downVotes: Number,
    downVoteArr: Array,
    userName: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    site: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Site'
    },
    userArr: Array,
})

//name the model
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;

