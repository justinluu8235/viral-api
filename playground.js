
const {User} = require('./models');

User.insertMany({
    userName: "viral", 
    email: "viral@email.com",
    firstName: "viral", 
    lastName: "viral",
    password: "viralPassword",
    state: "CA", 
    county: "viralCounty", 
})
.then((newUser) => {
    console.log(newUser);
})
.catch((error) => {
    console.log(error);
})