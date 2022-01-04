const axios = require('axios');

//Get all states

// axios.get('https://api.covidactnow.org/v2/states.json?apiKey=e9c1dd5532f840a5b7144e89bf77a0bd')
// .then((response) => {
//     console.log(response);
// })
// .catch((err) => {
//     console.log(err);
// })

// {
//     fips: '54',
//     country: 'US',
//     state: 'WV',
//     county: null,
//     level: 'state',
//     lat: null,
//     locationId: 'iso1:us#iso2:us-wv',
//     long: null,
//     population: 1792147,
//     metrics: [Object],
//     riskLevels: [Object],
//     cdcTransmissionLevel: 3,
//     actuals: [Object],
//     annotations: [Object],
//     lastUpdatedDate: '2022-01-03',
//     url: 'https://covidactnow.org/us/west_virginia-wv'
//   },
//   {
//     fips: '56',
//     country: 'US',
//     state: 'WY',
//     county: null,
//     level: 'state',
//     lat: null,
//     locationId: 'iso1:us#iso2:us-wy',
//     long: null,
//     population: 578759,
//     metrics: [Object],
//     riskLevels: [Object],
//     cdcTransmissionLevel: 3,
//     actuals: [Object],
//     annotations: [Object],
//     lastUpdatedDate: '2022-01-03',
//     url: 'https://covidactnow.org/us/wyoming-wy'
//   }
// ]
// }


// //Get data from individual county using a fip code
// axios.get('https://api.covidactnow.org/v2/county/06001.json?apiKey=e9c1dd5532f840a5b7144e89bf77a0bd')
// .then((response) => {
//     console.log(response.data);

// })
// .catch((err) => {
//     console.log(err);
// })


// {
//   fips: '06001',
//   country: 'US',
//   state: 'CA',
//   county: 'Alameda County',
//   level: 'county',
//   lat: null,
//   locationId: 'iso1:us#iso2:us-ca#fips:06001',
//   long: null,
//   population: 1671329,
//   metrics: {
//     testPositivityRatio: 0.094,
//     testPositivityRatioDetails: { source: 'other' },
//     caseDensity: 56.5,
//     contactTracerCapacityRatio: null,
//     infectionRate: 1.62,
//     infectionRateCI90: 0.1,
//     icuCapacityRatio: 0.62,
//     vaccinationsInitiatedRatio: 0.836,
//     vaccinationsCompletedRatio: 0.774
//   },
//   riskLevels: {
//     overall: 3,
//     testPositivityRatio: 1,
//     caseDensity: 3,
//     contactTracerCapacityRatio: 4,
//     infectionRate: 3,
//     icuCapacityRatio: 0
//   },
//   cdcTransmissionLevel: 3,
//   actuals: {
//     cases: 137131,
//     deaths: 1546,
//     positiveTests: null,
//     negativeTests: null,
//     contactTracers: null,
//     hospitalBeds: { capacity: 2585, currentUsageTotal: 1526, currentUsageCovid: 103 },
//     icuBeds: { capacity: 242, currentUsageTotal: 150, currentUsageCovid: 17 },
//     newCases: 1900,
//     newDeaths: 2,
//     vaccinesDistributed: null,
//     vaccinationsInitiated: 1396669,
//     vaccinationsCompleted: 1293132,
//     vaccinesAdministered: 3163289,
//     vaccinesAdministeredDemographics: null,
//     vaccinationsInitiatedDemographics: { age: [Object], race: [Object], ethnicity: null, sex: null }
//   },
//   annotations: {
//     cases: { sources: [Array], anomalies: [Array] },
//     deaths: { sources: [Array], anomalies: [] },
//     positiveTests: null,
//     negativeTests: null,
//     contactTracers: null,
//     hospitalBeds: { sources: [Array], anomalies: [] },
//     icuBeds: { sources: [Array], anomalies: [] },
//     newCases: null,
//     newDeaths: null,
//     vaccinesDistributed: null,
//     vaccinationsInitiated: { sources: [Array], anomalies: [] },
//     vaccinationsCompleted: { sources: [Array], anomalies: [] },
//     vaccinesAdministered: { sources: [Array], anomalies: [] },
//     testPositivityRatio: { sources: [Array], anomalies: [] },
//     caseDensity: { sources: [Array], anomalies: [Array] },
//     contactTracerCapacityRatio: null,
//     infectionRate: { sources: [Array], anomalies: [Array] },
//     infectionRateCI90: { sources: [Array], anomalies: [Array] },
//     icuCapacityRatio: { sources: [Array], anomalies: [] },
//     vaccinationsInitiatedRatio: null,
//     vaccinationsCompletedRatio: null
//   },
//   lastUpdatedDate: '2022-01-04',
//   url: 'https://covidactnow.org/us/california-ca/county/alameda_county'
// }