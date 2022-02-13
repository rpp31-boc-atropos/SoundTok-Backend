const express = require('express');
const pool = require('../database/config.js');
const db = require('../database/index.js');
var cors = require('cors');


const app = express();

app.use(express.json());

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

//ROUTES
app.post('/user', db.createUser);
app.get('/', db.getPosts);



app.listen(1234, () => {
  console.log('Server started on port 1234');
});