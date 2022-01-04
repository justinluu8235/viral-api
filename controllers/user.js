const express = require('express');
const router = express.Router();
const {User} = require('../models')


//get all users and return as array of objects
router.get("/" , async (request, response) => {
    try{
        const userArray = await User.find({});
        response.json({userArray});
    }
    catch(error){
        response.status(500).send(error);
    }
});


router.post("/" , async (request, response) => {
    try{
        let newUser = await User.insertMany({
            userName: request.body.userName, 
            email: request.body.email, 
            firstName: request.body.firstName, 
            lastName: request.body.lastName, 
            password: request.body.password, 
            state: request.body.state, 
            county: request.body.county, 
            vaccinePhotoUrl: ''
        })
        console.log(newUser);
    }
    catch(error){
        response.status(500).send(error);
    }
});




module.exports = router;