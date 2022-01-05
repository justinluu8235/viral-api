const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const COVID_API_KEY = process.env.COVID_API_KEY

// - Fetch API to display top 10 states for COVID: display state name and number of COVID cases 
axios.get(`https://api.covidactnow.org/v2/states.json?apiKey=${COVID_API_KEY}`)
    .then((res) => {
        let caseDensityArray = [];
        let densityArray = [];
        for (let i = 0; i < res.data.length; i++) {
            let state = res.data[i].state;
            let caseDensity = res.data[i].metrics.caseDensity;
            let index = i;
            let two = { index, state, caseDensity };
            caseDensityArray.push(two);
            densityArray.push(caseDensity);
        }
        console.log(densityArray);
        console.log(caseDensityArray);
        let topTenDensity = [];
        // for (let i = 0; i < 10; i++) {

        // }

    })
    .catch((err) => {
        console.log(err);
    })
// - Fetch API data by county name. Display # of cases, Fully vaccinated %, # of deaths, new cases



module.exports = router;