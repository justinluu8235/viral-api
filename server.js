const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const {User} = require('./models')


app.get("/users" , async (request, response) => {
    try{
        const userArray = await User.find({});
        console.log(userArray);
        response.json({userArray});
    }
    catch(error){
        response.status(500).send(error);
    }
});

app.listen(3000, () =>{
    console.log("Server is running at port 3000");
})