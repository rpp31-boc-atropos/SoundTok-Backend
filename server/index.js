const express = require('express');
const pool = require('../database/config.js');
const userPosts = require('../database/userPosts.js');
const userProfile = require('../database/userProfile.js');
var cors = require('cors');


const app = express();

app.use(express.json());

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

//ROUTES
app.get('/', userPosts.getPosts);
app.post('/', userPosts.postPost);
app.put('/', userPosts.updateLikes);
app.put('/', userPosts.updateSave);

app.get('/userPosts', userProfile.getUserProjects);



app.listen(1234, () => {
  console.log('Server started on port 1234');
});