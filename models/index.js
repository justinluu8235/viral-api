require("dotenv").config();
const mongoose = require("mongoose");


let connectionString;

if (process.env.NODE_ENV === 'production') {
    connectionString = process.env.DB_URL;
} else {
    connectionString = process.env.MONGO_URI 
}

const {MONGO_URI} = process.env;

const configOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

//connect to mongoDB
mongoose.connect(connectionString, configOptions)
.then(() => console.log("MongoDB successfully connected..."))
.catch((error)=> console.log("MongoDB connection error:", error));

const db = mongoose.connection;

db.once("open", () => {
    console.log(`Connected to MongoDB on ${db.host}:${db.port}`);
});

db.on("error", ()=>{
    console.log('MongoDB Error');
})



module.exports = {
    User: require("./user"),
    Site: require("./site"),
    CountyData: require("./countyData"),
    Review: require("./review")
}