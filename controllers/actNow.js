const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const COVID_API_KEY = process.env.COVID_API_KEY

// - Fetch API to display top 10 states for COVID: display state name and number of COVID cases 
router.get('/', async (req, response) => {

    try{
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
         //Sort based on case density
         stateDataArray.sort((a, b) => (a.actuals.cases > b.actuals.cases) ? 1 : -1);
 
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
         
         response.json({topTenDataArr})
    }
    catch(error){
        console.log(error);
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
         // console.log(topTenDataArr);
});

// axios.get(`https://api.census.gov/data/2010/dec/sf1?get=NAME&for=county:*`)
//     .then((res) => {
//         console.log(res.data);
//     })
//     .catch((err) => {
//         console.log(err);
//     })
// - Fetch API data by county name. Display # of cases, Fully vaccinated %, # of deaths, new cases

// axios.get(`https://api.covidactnow.org/v2/county/${fips}.json?apiKey=${COVID_API_KEY}`)

axios.get(`https://api.covidactnow.org/v2/county/55037.json?apiKey=${COVID_API_KEY}`)
    .then((res) => {
        let countyInfo = {
            fips: res.data.fips,
            state: res.data.state,
            county: res.data.county,
            population: res.data.population,
            caseDensity: res.data.metrics.caseDensity,
            cases: res.data.actuals.cases,
            deaths: res.data.actuals.deaths,
            newCases: res.data.actuals.newCases,
            newDeaths: res.data.actuals.newDeaths,
            vaccinationsInitiated: res.data.actuals.vaccinationsInitiated,
            vaccinationsCompleted: res.data.actuals.vaccinationsCompleted,
        };
        console.log(countyInfo);
    })
    .catch((err) => {
        console.log(err);
    })

module.exports = router;