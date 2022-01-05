const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const {User} = require('./models')
const cors = require('cors');

//import controllers
app.use('/users', require('./controllers/user'));
app.use('/site', require('./controllers/site'));
// app.use('/actNow', require('./controllers/actNow'));

app.listen(3000, () =>{
    console.log("Server is running at port 3000");
})