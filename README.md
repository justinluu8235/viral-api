# Viral API

Viral is a MERN stack application used for finding the latest COVID information by location,
display latest COVID hotspots, and provide users information on where they can get vaccines and booster shots.
Users will be able to ‘vouch’ for vaccination sites and leave reviews to let others know if they are reliable.


The Viral API provides database management for sites, users, as well as COVID data from the ActNow API.


## Entity Relationship Diagram
The following ERD details the associations between the user, sites, and their reviews/wait time.

![ERD](./img/ViralERD.png)

The database was created using the mongoose OdM. Associations were made as shown with reviews being referenced and wait times being embedded in sites: 


```js
const waitTimeSchema = new mongoose.Schema({
    waitTime:String,
})

const siteSchema = new mongoose.Schema({
    name: String, 
    address: String, 
    city: String, 
    state: String, 
    zipCode: Number, 
    phoneNumber: String,
    popularWaitTime: String,
    waitTimes: [waitTimeSchema]
})
```


```js
const reviewSchema = new mongoose.Schema({
    review: String, 
    createdDate: String, 
    upVotes: Number,
    upVoteArr: Array,
    downVotes: Number,
    downVoteArr: Array,
    userName: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    site: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Site'
    },
    userArr: Array,
    downVoteColor: String, 
    upVoteColor: String, 
})
```



### Act Now COVID API

Up to date COVID information was fetched from the Act Now API:

```js
  let api = await axios.get(`https://api.covidactnow.org/v2/county/${countyId}.json?apiKey=${COVID_API_KEY}`)
        let countyInfo = {
            fips: api.data.fips,
            state: api.data.state,
            county: api.data.county,
            population: api.data.population,
            caseDensity: api.data.metrics.caseDensity,
            cases: api.data.actuals.cases,
            deaths: api.data.actuals.deaths,
            newCases: api.data.actuals.newCases,
            newDeaths: api.data.actuals.newDeaths,
            vaccinationsInitiated: api.data.actuals.vaccinationsInitiated,
            vaccinationsCompleted: api.data.actuals.vaccinationsCompleted,
        };
```

### Cloudinary Image Storage

Cloudinary was used to store the vaccine photos uploaded by the user. A data URI is received for the photo, the cloudinary API is called, and a Public ID url from cloudinary is stored by the user. 

The same public ID is used to fetch the photo from cloudinary to render on the user's profile page on the front end.

Below is a code example for uploading to cloudinary:

```js
     //Upload to cloudinary
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: "viralapi"
        })
        let uploadedPublicID = uploadedResponse.public_id;

        //get the user, and update the vaccine photo url to the public ID from cloudinary
        const userId = req.body.userId;
        let user = await User.updateOne({
            _id: userId,
        }, {
            $set: { vaccinePhotoUrl: uploadedPublicID }
        })
```


### RESTful Routing

The following table illustrates the routes that are used by the server to allow the frontend application to interact with the database and needed APIs.

 Verb | URL | Description
 ----------- | ----------- | -----------
 GET | / | Home Page
 GET | /auth/login |  Log in screen
 GET | /auth/signup | Sign up screen for new account
 GET | /auth/logout |  Log out of current account
 POST | /auth/login |  Log in to an existing account
 POST | /auth/signup |  Sign up and log in
 GET | /recipes |  display all user's recipes
 GET | /recipes/new | Create a new recipe
 GET | /recipes/edit/:id | Edit an individual recipe
 GET | /recipes/:id | display an individual recipe
 POST | /recipes | Create a Recipe based on name, ingredients, and instructions provided
 POST | /recipes/:id | Create shopping list items based on a recipe's ingredients
 PUT | /recipes/:id |  Save edited data of a recipe, its ingredients, and instructions
 DELETE | /recipes/:id |  delete a recipe, and any associated menu item
 GET | /searchRecipes |  search for a recipe on spoonacular API