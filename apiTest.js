const axios = require('axios');

//Get all states

// axios.get('https://api.covidactnow.org/v2/states.json?apiKey=e9c1dd5532f840a5b7144e89bf77a0bd')
// .then((response) => {
//     console.log(response.data[1].actuals);
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


//Get data from individual county using a fip code
// axios.get('https://api.covidactnow.org/v2/county/55037.json?apiKey=e9c1dd5532f840a5b7144e89bf77a0bd')
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


// axios.get('https://api.census.gov/data/2010/dec/sf1?get=NAME&for=county:*')
// .then((response) => {
//     console.log(response);
// })
// .catch((err) => {
//     console.log(err);
// })

/*
Site 1 - Oakland - 94605
Site 2 - Oakland - 94605
Site 3 - Oakland - 94601
Site 4 - San Fransisco - 94605
*/


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
                let citySite = citySiteArr[i];
                let zip = citySite.zipCode;
                console.log(zip)
                if(zipResults[zip] == undefined){
                    zipResults[zip] = [citySite]
                    console.log(zipResults)
                }else{
                    zipResults[zip].push(citySite);
                }
            }
        }

        console.log(zipResults);

        response.json({siteArray});
    }
    catch(error){
        response.status(500).send(error);
    }
});

// MongoDB successfully connected...
// [
//   [
//     {
//       _id: new ObjectId("61d739bd4186d425f9035791"),
//       name: 'Oakland Site',
//       address: 'address12',
//       city: 'Oakland',
//       state: 'CA',
//       zipCode: 94605,
//       waitTimes: [],
//       __v: 0
//     },
//     {
//       _id: new ObjectId("61d739f44186d425f9035793"),
//       name: 'Oakland Site 2',
//       address: 'address45',
//       city: 'Oakland',
//       state: 'CA',
//       zipCode: 94605,
//       waitTimes: [],
//       __v: 0
//     },
//     {
//       _id: new ObjectId("61d739f54186d425f9035795"),
//       name: 'Oakland Site 2',
//       address: 'address45',
//       city: 'Oakland',
//       state: 'CA',
//       zipCode: 94605,
//       waitTimes: [],
//       __v: 0
//     },
//     {
//       _id: new ObjectId("61d73f173da9a24a4ceef0b2"),
//       name: 'Site 1',
//       address: '',
//       city: 'Oakland',
//       state: '',
//       zipCode: 94605,
//       waitTimes: [],
//       __v: 0
//     },
//     {
//       _id: new ObjectId("61d73fb43da9a24a4ceef0b8"),
//       name: 'site4',
//       address: '',
//       city: 'Oakland',
//       state: '',
//       zipCode: 94601,
//       waitTimes: [],
//       __v: 0
//     }
//   ],
//   [
//     {
//       _id: new ObjectId("61d73f2c3da9a24a4ceef0b4"),
//       name: 'zsite2',
//       address: '',
//       city: 'Oakland ',
//       state: '',
//       zipCode: 94605,
//       waitTimes: [],
//       __v: 0
//     }
//   ],
//   [
//     {
//       _id: new ObjectId("61d73a1e4186d425f9035797"),
//       name: 'SF Site 1',
//       address: 'address45',
//       city: 'San Fransisco',
//       state: 'CA',
//       zipCode: 94711,
//       waitTimes: [],
//       __v: 0
//     },
//     {
//       _id: new ObjectId("61d73a1f4186d425f9035799"),
//       name: 'SF Site 1',
//       address: 'address45',
//       city: 'San Fransisco',
//       state: 'CA',
//       zipCode: 94711,
//       waitTimes: [],
//       __v: 0
//     },
//     {
//       _id: new ObjectId("61d73faa3da9a24a4ceef0b6"),
//       name: 'site3',
//       address: '',
//       city: 'San Fransisco',
//       state: '',
//       zipCode: 94605,
//       waitTimes: [],
//       __v: 0
//     }
//   ]
// ]