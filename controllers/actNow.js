const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();
const {CountyData} = require('../models')

const COVID_API_KEY = process.env.COVID_API_KEY

// - Fetch API to display top 10 states for COVID: display state name and number of COVID cases 
router.get('/', async (req, response) => {
    try {
        let res = await axios.get(`https://api.covidactnow.org/v2/states.json?apiKey=${COVID_API_KEY}`);
        //Build an array of all state data
        let stateDataArray = [];

        for (let i = 0; i < res.data.length; i++) {
            // let state = res.data[i].state;
            // let caseDensity = res.data[i].metrics.caseDensity;
            // let index = i;
            let two = res.data[i];
            stateDataArray.push(two);
        }
        //Sort based on cases
        stateDataArray.sort((a, b) => (a.actuals.cases > b.actuals.cases) ? 1 : -1);

        // take top 10
        let topTenCasesArr = [];
        for (let i = 0; i < 10; i++) {
            let temp = {};
            let stateData = stateDataArray[((stateDataArray.length - 1) - i)];
            temp.state = stateData.state;
            temp.caseDensity = stateData.metrics.caseDensity;
            temp.cases = stateData.actuals.cases;
            temp.deaths = stateData.actuals.deaths;
            temp.positiveTests = stateData.actuals.positiveTests;
            temp.negativeTests = stateData.actuals.negativeTests;
            temp.hospitalBeds = stateData.actuals.hospitalBeds;
            temp.icuBeds = stateData.actuals.icuBeds;
            temp.newCases = stateData.actuals.newCases;
            temp.newDeaths = stateData.actuals.newDeaths;
            temp.vaccinesDistributed = stateData.actuals.vaccinesDistributed;
            temp.vaccinationsInitiated = stateData.actuals.vaccinationsInitiated;
            temp.vaccinationsCompleted = stateData.actuals.vaccinationsCompleted;
            topTenCasesArr.push(temp);
        }

        //Sort based on deaths
        stateDataArray.sort((a, b) => (a.actuals.deaths > b.actuals.deaths) ? 1 : -1);

        // take top 10
        let topTenDeathsArr = [];
        for (let i = 0; i < 10; i++) {
            let temp = {};
            let stateData = stateDataArray[((stateDataArray.length - 1) - i)];
            temp.state = stateData.state;
            temp.caseDensity = stateData.metrics.caseDensity;
            temp.cases = stateData.actuals.cases;
            temp.deaths = stateData.actuals.deaths;
            temp.positiveTests = stateData.actuals.positiveTests;
            temp.negativeTests = stateData.actuals.negativeTests;
            temp.hospitalBeds = stateData.actuals.hospitalBeds;
            temp.icuBeds = stateData.actuals.icuBeds;
            temp.newCases = stateData.actuals.newCases;
            temp.newDeaths = stateData.actuals.newDeaths;
            temp.vaccinesDistributed = stateData.actuals.vaccinesDistributed;
            temp.vaccinationsInitiated = stateData.actuals.vaccinationsInitiated;
            temp.vaccinationsCompleted = stateData.actuals.vaccinationsCompleted;
            topTenDeathsArr.push(temp);
        }

        //Sort based on deaths
        stateDataArray.sort((a, b) => (a.actuals.newCases > b.actuals.newCases) ? 1 : -1);

        // take top 10
        let topTenNewCasesArr = [];
        for (let i = 0; i < 10; i++) {
            let temp = {};
            let stateData = stateDataArray[((stateDataArray.length - 1) - i)];
            temp.state = stateData.state;
            temp.caseDensity = stateData.metrics.caseDensity;
            temp.cases = stateData.actuals.cases;
            temp.deaths = stateData.actuals.deaths;
            temp.positiveTests = stateData.actuals.positiveTests;
            temp.negativeTests = stateData.actuals.negativeTests;
            temp.hospitalBeds = stateData.actuals.hospitalBeds;
            temp.icuBeds = stateData.actuals.icuBeds;
            temp.newCases = stateData.actuals.newCases;
            temp.newDeaths = stateData.actuals.newDeaths;
            temp.vaccinesDistributed = stateData.actuals.vaccinesDistributed;
            temp.vaccinationsInitiated = stateData.actuals.vaccinationsInitiated;
            temp.vaccinationsCompleted = stateData.actuals.vaccinationsCompleted;
            topTenNewCasesArr.push(temp);
        }
        console.log("TOP TEN DEATHS", topTenDeathsArr)
            response.json({ topTenCasesArr, topTenDeathsArr, topTenNewCasesArr })
    }
    catch (error) {
        console.log(error);
    }

});



router.post('/county', async (req, res) => {
    try {
        console.log(req.body.county)
        
        let county = req.body.county;
        console.log(county);
        let countyData = await CountyData.findOne({
            countyName: county
        })
        let countyId = countyData.code;
        
        let api = await axios.get(`https://api.covidactnow.org/v2/county/${countyId}.json?apiKey=${COVID_API_KEY}`)
        let countyInfo = {
            fips: api.data.fips,
            state: api.data.state,
            county: api.data.county,
            population: api.data.population,
            caseDensity: api.data.metrics.caseDensity,
            cases: api.data.actuals.cases,
            deaths: api.data.actuals.deaths,
            newCases: api.data.actuals.newCases,
            newDeaths: api.data.actuals.newDeaths,
            vaccinationsInitiated: api.data.actuals.vaccinationsInitiated,
            vaccinationsCompleted: api.data.actuals.vaccinationsCompleted,
        };

        res.json({countyInfo});
    }
    catch (err) {
        console.log(err);
    }
})



module.exports = router;