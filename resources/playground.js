
const {User, CountyData} = require('../models');
const axios = require('axios');



axios.get('https://api.census.gov/data/2010/dec/sf1?get=NAME&for=county:*')
.then((response) => {
    // console.log(response.data);
    for(let i=1; i<response.data.length; i++){
        let countyInfo = response.data[i];
        let codeInfo = countyInfo[1] + countyInfo[2];
        // CountyData.insertMany({
        //     countyName: countyInfo[0], 
        //     code: codeInfo
        // })
        
    }
    
})

//         .then((newUser) => {
//     console.log(newUser);
// })
// .catch((error) => {
//     console.log(error);
// })
        
//     }
    
// })
    
.catch((err) => {
    console.log(err);
})


// User.insertMany({
//     userName: "justinl",
//     email: "justin@justin.com",
//     firstName: "justin",
//     lastName: "luu",
//     password: "SEI102599",
//     state: "CA",
//     county: "alameda",
//     vaccinePhotoUrl: "",
// })
// .then((newUser) => {
//     console.log(newUser);
// })
// .catch((error) => {
//     console.log(error);
// }) 
