const express = require('express');
const pool = require('../database/config.js');
const db = require('../database/index.js');

const app = express();

app.use(express.json());

//ROUTES
app.get('/tracks', db.getAllTracks);


app.listen(3000, () => {
  console.log('Server started on port 3000');
});