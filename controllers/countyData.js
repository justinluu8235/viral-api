const express = require('express');
const router = express.Router();
const {CountyData} = require('../models')






// - return all the counties
router.get("/counties" , async (request, response) => {
    try{
        let countyNameArr = []
        let countyDataArr = await CountyData.find().sort({countyName:1});
        for(let i=0; i<countyDataArr.length; i++){
            let countyData = countyDataArr[i];
            let name = countyData.countyName;
            countyNameArr.push(name);
        }


        response.json({countyNameArr});
    }
    catch(error){
        response.status(500).send(error);
    }
});

module.exports = router;