const express = require('express');
const router = express.Router();
const {Site} = require('../models')


//Get Sites that are in the same zipcode, and cities that share that zip code
//Return an object with zip code as key and array of sites in that zipcode as value
router.get("/zip/:zip" , async (request, response) => {
    try{
        let zip = request.params.zip;
        let zipResults = {};
        let cityLocationArr = [];
        const siteArray = await Site.find({
            zipCode: zip
        });
        
        // Creates an array of cities that are in the given zip code based on site input
        for (let i = 0; i < siteArray.length; i++) {
            let city = siteArray[i].city;
            if(!cityLocationArr.includes(city)) {
                cityLocationArr.push(city);
            }
        }
        
        //Query sites based on the cities
        let citySitesArr = [];
        for(let i=0; i<cityLocationArr.length; i++){
            //Oakland, SF
            const citySites = await Site.find({
                city: cityLocationArr[i]
            })
            citySitesArr.push(citySites); //Array of array

        }
        
        //Build object by zip code;
        for(let i=0; i<citySitesArr.length; i++){
            //the array for each city
            let citySiteArr = citySitesArr[i];
            for(let j=0; j<citySiteArr.length; j++){
                //the individual site
                let citySite = citySiteArr[j];
                let zip = citySite.zipCode;
                if(zipResults[zip] == undefined){
                    zipResults[zip] = [citySite]
                
                }else{
                    zipResults[zip].push(citySite);
                }
            }
        }
        let zipObj = {}
        zipObj.closeBy = [];
        for(zipCode in zipResults){
            console.log(zipCode);
            console.log("++++" ,zip )
            if(zipCode == zip){
                console.log("hello");
                zipObj[zip] = zipResults[zip];
            }
            else{
                let array = zipResults[zipCode];
                console.log("hello");
                for(let i=0; i<array.length; i++){
                    let site = array[i];
                    zipObj.closeBy.push(site)
                }
            }
            

        }
        let zipArr = zipObj[zip];
        let closeByArr = zipObj['closeBy']
        response.json({zipArr,closeByArr});
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

//take in the site ID and an additional wait time and add to the array
router.put("/updateWaitTime", async (request, response) => {
    let siteId = request.body.siteId;
    let waitTime = request.body.waitTime;

    const site = await Site.find({
        _id: siteId
    });
    site.waitTimes.push({
        waitTime: waitTime
    })
    
});


module.exports = router;