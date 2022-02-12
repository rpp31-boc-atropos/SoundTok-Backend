const express = require('express');
const pool = require('../database/config.js');
const db = require('../database/index.js');

const app = express();

app.use(express.json());

//ROUTES
app.get('/', db.getPosts);


app.listen(1234, () => {
  console.log('Server started on port 1234');
});