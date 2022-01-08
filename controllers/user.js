require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const passport = require('passport');
const { User } = require('../models')
const { cloudinary } = require('../utils/cloudinary')
const axios = require('axios');




// //get all users and return as array of objects
router.get("/", async (request, response) => {
    try {
        const userArray = await User.find({});
        response.json({ userArray });
    }
    catch (error) {
        response.status(500).send(error);
    }
});

router.get('/test', (req, res) => {
    res.json({
        message: 'Testing users controller'
    });
});

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log('====> inside /profile');
    console.log('====> user', req.user);
    const { id, userName, name, email, date, state, county, vaccinePhotoUrl } = req.user; // object with user object inside



    res.json({ id, userName, name, email, date, state, county, vaccinePhotoUrl });
});


router.get("/photo/:email", async (req, res) => {
    let userEmail = req.params.email;
    // console.log("USER Email", userEmail);
    let user = await User.findOne({
        email: userEmail
    })
    if (user != null && user.vaccinePhotoUrl != '') {
        let publicId = user.vaccinePhotoUrl;
        console.log("SDA", publicId);
        // console.log("PUBLIC ID" , publicId);
        //returns an array of files from that folder
        // const {resources} = await cloudinary.search.expression('folder:viralapi')
        // .sort_by('public_id', 'desc')
        // .max_results(30)
        // .execute();

        const { resources } = await cloudinary.search.expression(`public_id:${publicId}`)
            .sort_by('public_id', 'desc')
            .max_results(30)
            .execute();
        // console.log(resources);
        //mapping the array to only take the publicID
        const publicIds = resources.map(file => file.public_id);
        res.send(publicIds);
    }


})

router.post('/photo', async (req, res) => {

    try {
        //get the data URI from frontend 
        const fileStr = req.body.data;
        console.log(fileStr)
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
        // console.log(user);
        // console.log(uploadedResponse);
        // res.redirect("localhost:3001/profile")
    }
    catch (error) {
        console.log(error);
    }


});




router.post('/signup', async (req, res) => {
    // POST - adding the new user to the database
    console.log('===> Inside of /signup');
    console.log(req.body);

    User.findOne({ email: req.body.email })
        .then(user => {
            // if email already exists, a user will come back
            if (user) {
                // send a 400 response
                return res.status(400).json({ message: 'Email already exists' });
            } else {
                // Create a new user
                const newUser = new User({
                    userName: req.body.userName,
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    state: req.body.state,
                    county: req.body.county,
                    vaccinePhotoUrl: ''
                });

                // Salt and hash the password - before saving the user
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw Error;

                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) console.log('==> Error inside of hash', err);
                        // Change the password in newUser to the hash
                        newUser.password = hash;
                        newUser.save()
                            .then(createdUser => res.json(createdUser))
                            .catch(err => console.log(err));
                    });
                });


            }
        })
        .catch(err => {
            console.log('Error finding user', err);
            res.json({ message: 'An error occured. Please try again.' })

        })
});

router.post('/login', async (req, res) => {
    // POST - finding a user and returning the user
    console.log('===> Inside of /login');
    console.log(req.body);
    console.log("Email", req.body.email)
    const foundUser = await User.findOne({ email: req.body.email });
    console.log("User Found: ", foundUser);
    if (foundUser) {
        // user is in the DB
        let isMatch = await bcrypt.compare(req.body.password, foundUser.password);
        console.log('Match User', isMatch);
        if (isMatch) {
            // Updated timesLoggedin
            foundUser.timesLoggedIn += 1;
            foundUser.save();
            // if user match, then we want to send a JSON Web Token
            // Create a token payload
            // add an expiredToken = Date.now()
            // save the user
            console.log("COUNTY", foundUser.county)
            const payload = {
                id: foundUser.id,
                email: foundUser.email,
                name: foundUser.name,
                state: foundUser.state,
                county: foundUser.county,
            }

            jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
                if (err) {
                    res.status(400).json({ message: 'Session has endedd, please log in again' });
                }
                const legit = jwt.verify(token, JWT_SECRET, { expiresIn: 60 });
                console.log('===> legit');
                console.log(legit);
                res.json({ success: true, token: `Bearer ${token}`, userData: legit });
            });


        } else {
            return res.status(400).json({ message: 'Email or Password is incorrect' });
        }
    } else {
        return res.status(400).json({ message: 'User not found' });
    }
});

//Update user profile
router.post('/update', async (req, res) => {
    console.log("INSIDE UPDATE USER ROUTE")
    console.log("EXiSTING EMAIL", req.body.user.email)
    User.findOne({ email: req.body.user.email })
        .then( async user => {
           
            // if email already exists, a user will come back
            if (!user) {
                // send a 400 response
                return res.status(400).json({ message: 'Email already exists' });
            } else {

                console.log("EXISTING USER FOUND", user)
                // let hashPassword;

                // // Salt and hash the password - before saving the user
                // bcrypt.genSalt(10, (err, salt) => {
                //     if (err) throw Error;

                //     bcrypt.hash(req.body.password, salt, (err, hash) => {
                //         if (err) console.log('==> Error inside of hash', err);
                //         // Change the password in newUser to the hash
                //         password = hash;
                //         // newUser.save()
                //         //     .then(createdUser => res.json(createdUser))
                //         //     .catch(err => console.log(err));
                //     });
                // });



                let update = await User.updateOne({
                    _id: req.body.user.id,
                }, {
                    $set: {
                        name: req.body.newName,
                        email: req.body.newEmail,
                        // password: hashPassword,
                        state: req.body.newState,
                        county: req.body.newCounty,
                    }
                })
            }




        })
        .catch(err => {
            console.log('Error finding user', err);
            res.json({ message: 'An error occured. Please try again.' })

        })


});

module.exports = router;
