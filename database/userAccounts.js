const pool = require('../database/config.js');
const express = require('express');


const createUser = async (req, res) => {
  console.log('in here!');
  console.log(req.body);
  const { email, username, name, nickname, picture } = req.body.params;
  const query1 = "INSERT INTO user_accounts (email, username, profilePicture) VALUES ($1, $2, $3) RETURNING *"
  const params = [email, username, picture];
  await pool
    .query(query1, params)
    .then(results => {
      console.log(`user information for ${name} created!`);
      res.status(201).json('added a user to the database');
    })
    .catch(err => {
      console.log(err.stack)
    })
}


module.exports = {
  createUser
};