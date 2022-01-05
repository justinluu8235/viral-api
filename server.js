const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(express.urlencoded({ extended: false }));
const {User} = require('./models')
require('dotenv').config();
const passport = require('passport');
require('./config/passport')(passport);

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());


//import controllers
app.use('/users', require('./controllers/user'));
app.use('/site', require('./controllers/site'));
// app.use('/actNow', require('./controllers/actNow'));

app.listen(3000, () =>{
    console.log("Server is running at port 3000");
})