
const {User} = require('./models');

User.insertMany({
    userName: "justinl",
    email: "justin@justin.com",
    firstName: "justin",
    lastName: "luu",
    password: "SEI102599",
    state: "CA",
    county: "alameda",
    vaccinePhotoUrl: "",
})
.then((newUser) => {
    console.log(newUser);
})
.catch((error) => {
    console.log(error);
})