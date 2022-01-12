const express = require('express');
const app = express();

const cors = require('cors');

const {User} = require('./models')
require('dotenv').config();
const passport = require('passport');
require('./config/passport')(passport);


const PORT = process.env.PORT || 8000;

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(express.urlencoded({parameterLimit: 100000, limit: '10mb', extended: false}));
app.use(express.json({parameterLimit: 100000, limit: '10mb', extended: false}));
app.use(cors());
app.use(passport.initialize());


//import controllers
app.use('/users', require('./controllers/user'));
app.use('/site', require('./controllers/site'));
app.use('/actNow', require('./controllers/actNow'));
app.use('/countyData', require('./controllers/countyData'))
app.use('/review', require('./controllers/review'))


app.listen(PORT, () =>{
    console.log("Server is running at port 3000");
})
