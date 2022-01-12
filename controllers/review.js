const express = require('express');
const router = express.Router();
const { Review } = require('../models')


// Get all the reviews for a specific site
router.get("/:siteId", async (request, response) => {
   
    try {
        let allReviewArr = await Review.find({
            site: request.params.siteId
        })
        response.json({allReviewArr});
    }
    catch (error) {
        response.status(500).send(error);
    }

});



//Create a new review for a site
router.post("/new/", async (request, response) => {
   
    try {
        let newReview = await Review.insertMany({
            review: request.body.review,
            createdDate: request.body.createdDate,
            upVotes: request.body.upVotes,
            downVotes: request.body.downVotes,
            userName: request.body.nameOfUser,
            user: request.body.userId,
            site: request.body.siteId,
            upVoteColor: request.body.upVoteColor,
            downVoteColor: request.body.downVoteColor,
        })

        response.json({newReview});

    }
    catch (error) {
        response.status(500).send(error);
    }

});

//Get a specific review 
router.post('/comment', async (req, res) => {

    try{
        let comment = await Review.find({
            _id: req.body.id
        })
        res.json({comment});
    }
    catch(err) {
        res.status(500).send(err);
    }
})

//Add an upvote to the review, as well as keep track of the user that upvoted
router.post('/vote', async (req, res) => {
    try {
        let update = await Review.updateOne({
            _id: req.body.id
        }, {
            upVotes: req.body.upVotes,
            upVoteArr: req.body.upVoteArr,
            userArr: req.body.userArr,
        })
        res.json(req.body.upVotes);
    }
    catch(err) {
        res.status(500).send(err);
    }
})



//Add an downvote to the review, as well as keep track of the user that downvoted
router.post('/downvote', async(req, res) => {
    try {
        let update = await Review.updateOne({
            _id: req.body.id
        }, {
            downVotes: req.body.downVotes,
            downVoteArr: req.body.downVoteArr,
            userArr: req.body.userArr,
        })
        let review = await Review.find({
            _id: req.body.id
        })
        res.json(req.body.downVotes);
    }
    catch(err) {
        res.status(500).send(err);
    }
})
module.exports = router;