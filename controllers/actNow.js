const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const COVID_API_KEY = process.env.COVID_API_KEY

// - Fetch API to display top 10 states for COVID: display state name and number of COVID cases 

axios.get(`https://api.covidactnow.org/v2/states.json?apiKey=${COVID_API_KEY}`)
    .then((res) => {
        //Build an array of all state data
        let stateDataArray = [];
        for (let i = 0; i < res.data.length; i++) {
            // let state = res.data[i].state;
            // let caseDensity = res.data[i].metrics.caseDensity;
            // let index = i;
            let two = res.data[i];
            stateDataArray.push(two);
        }
        //Sort based on case density
        stateDataArray.sort((a, b) => (a.metrics.caseDensity > b.metrics.caseDensity) ? 1 : -1);

        // take top 10
        let topTenDataArr = [];
        for(let i = 0; i < 10; i++){
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
            topTenDataArr.push(temp);
        }
        //Data returned for the ten states
        // [{
        //     state: 'IL',
        //     caseDensity: 182.4,
        //     cases: 2243215,
        //     deaths: 31212,
        //     positiveTests: 2124389,
        //     negativeTests: 33311263,
        //     hospitalBeds: {
        //       capacity: 27205,
        //       currentUsageTotal: 19548,
        //       currentUsageCovid: 5813
        //     },
        //     icuBeds: { capacity: 3119, currentUsageTotal: 2290, currentUsageCovid: 999 },
        //     newCases: 89157,
        //     newDeaths: 195,
        //     vaccinesDistributed: 23263615,
        //     vaccinationsInitiated: 9118884,
        //     vaccinationsCompleted: 8114639
        //   }]

        console.log(topTenDataArr);
        
    })
    .catch((err) => {
        console.log(err);
    })

    // topTenDensitiesArr = the top ten states and names




axios.get(`https://api.covidactnow.org/v2/states.json?apiKey=${COVID_API_KEY}`)
    .then((res) => {

    })
    .catch((err) => {
        console.log(err);
    })
// - Fetch API data by county name. Display # of cases, Fully vaccinated %, # of deaths, new cases



module.exports = router;