const pool = require('../database/config.js');
const express = require('express');

const createUser = async (req, res) => {
  const { email, username, name, nickname, picture } = req.body.params;
  const query1 = "SELECT email FROM user_accounts WHERE email = $1"
  const params1 = [email]
  const query2 = "INSERT INTO user_accounts (email, username, profilePicture) VALUES ($1, $2, $3) RETURNING *"
  const params2 = [email, username, picture];

  try {
    const data = await pool.query(query1, params1); // check if user is in DB
    if (data.rows.length !== 0) {
      res.status(200).json(`${username} is an existing user`);
    } else {
      console.log(`${username} added to the database!`);
      res.status(201).json(`${username} added to the database`)
      await pool.query(query2, params2)
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error"
    })
  }
}


module.exports = {
  createUser
};