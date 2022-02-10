const express = require('express');
const pool = require('../database/index.js');
const model = require('./models.js');

const app = express();

app.use(express.json());

//ROUTES
//sample route
app.get('/', async(req, res) => {
  try {
    const allTracks = await pool.query(model.getAllTracks)
    res.status(200).json(allTracks.rows)
  } catch (err) {
    console.log(err)
  }
});


app.listen(3000, () => {
  console.log('Server started on port 3000');
});