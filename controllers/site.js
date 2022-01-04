const express = require('express');
const router = express.Router();
const {Site} = require('../models')

// - Display all sites at zip 
router.get("/zip/:zip" , async (request, response) => {
    try{
        let zip = request.params.zip;

        const siteArray = await Site.find({
            zipCode: zip
        });
        response.json({siteArray});
    }
    catch(error){
        response.status(500).send(error);
    }
});




// - Individual site page - display all the info including comments 
router.get("/:id" , async (request, response) => {
    try{
        let id = request.params.id;

        const site = await Site.find({
            _id: id
        });
        response.json({site});
    }
    catch(error){
        response.status(500).send(error);
    }
});

// - New site route 
router.post("/new" , async (request, response) => {
    try{

        let newSite = await Site.insertMany({
            name: request.body.name, 
            address: request.body.address, 
            city: request.body.city, 
            state: request.body.state, 
            zipCode: request.body.zipCode, 
            state: request.body.state, 
            mondayHours: request.body.mondayHours, 
            tuesdayHours: request.body.tuesdayHours, 
            wednesdayHours: request.body.wednesdayHours, 
            thursdayHours: request.body.thursdayHours, 
            fridayHours: request.body.fridayHours, 
            saturdayHours: request.body.saturdayHours, 
            sundayHours: request.body.sundayHours, 
        })
    }
    catch(error){
        response.status(500).send(error);
    }
});

module.exports = router;