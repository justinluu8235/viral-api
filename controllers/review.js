const express = require('express');
const router = express.Router();
const { Review } = require('../models')

router.get("/:siteId", async (request, response) => {
    console.log('review backend connected')
   
    try {
        let allReviewArr = await Review.find({
            site: request.params.siteId
        })
        // console.log("ALL REVIEW", allReviewArr);

        response.json({allReviewArr});

    }
    catch (error) {
        response.status(500).send(error);
    }

});

router.post("/new/", async (request, response) => {
    console.log('review backend connected')
   
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
        console.log("NEW REVIEW", newReview);

        response.json({newReview});

    }
    catch (error) {
        response.status(500).send(error);
    }

});

router.post('/comment', async (req, res) => {
    console.log('connecting comment');
    console.log(req.body.id);
    try{
        let comment = await Review.find({
            _id: req.body.id
        })
        console.log(comment);
        res.json({comment});
    }
    catch(err) {
        res.status(500).send(err);
    }
})

router.post('/vote', async (req, res) => {
    try {
        let update = await Review.updateOne({
            _id: req.body.id
        }, {
            upVotes: req.body.upVotes,
            upVoteArr: req.body.upVoteArr,
            userArr: req.body.userArr,
            upVoteColor: req.body.upVoteColor
        })
        console.log(req.body.userArr);
        res.json(req.body.upVotes);
    }
    catch(err) {
        res.status(500).send(err);
    }
})

router.post('/downvote', async(req, res) => {
    try {
        let update = await Review.updateOne({
            _id: req.body.id
        }, {
            downVotes: req.body.downVotes,
            downVoteArr: req.body.downVoteArr,
            userArr: req.body.userArr,
            downVoteColor: req.body.downVoteColor
        })
        let review = await Review.find({
            _id: req.body.id
        })
        console.log("UPDATED REVIEW", review);
        res.json(req.body.downVotes);
    }
    catch(err) {
        res.status(500).send(err);
    }
})
module.exports = router;