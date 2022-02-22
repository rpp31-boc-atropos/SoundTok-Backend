const express = require('express');
const pool = require('../database/config.js');
const userAccounts = require('../database/userAccounts.js');
const userPosts = require('../database/userPosts.js');
const userProfile = require('../database/userProfile.js');
const port = 1234;
var cors = require('cors');


const app = express();

app.use(express.json());

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

//ROUTES

//AUTH / FRONT-END REACT USE CONTEXT
app.post('/createUser', userAccounts.createUser);
app.get('/getUserData', userAccounts.getUpdatedData);

//FEED
app.get('/', userPosts.getPosts);
app.post('/', userPosts.postPost);
app.put('/', userPosts.updateLikes);
app.put('/', userPosts.updateSave);
app.get('/getHashtags/:tag', userPosts.getHashtagPosts);

//PROFILE
app.get('/getProfileData/projects/:username', userProfile.getUserProjects);
app.put('/updateProfile', userProfile.updateProfile);

//STUDIOS
//tbd

app.listen(process.env.PORT || port, () => {
  console.log('Server started on port 1234');
});