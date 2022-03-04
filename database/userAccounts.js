const pool = require('../database/config.js');
const express = require('express');
const transformUrl = require('./transformUrl.js');

const createUser = async (req, res) => {
  let { email, username, name, nickname, picture } = req.body.params;
  picture = transformUrl(picture) || picture
  if (!username) {
    username = nickname
  }
  console.log('username: ', username)
  const query1 = "SELECT email FROM user_accounts WHERE email = $1"
  const params1 = [email];
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

const getUpdatedData = async (req, res) => {
  const { email } = req.query;
  console.log('getting updated data: ', email)

  await pool
    .query(
      `SELECT
        u.email AS "email",
        u.username AS "username",
        u.user_bio AS "userBio",
        u.profilepicture AS "profilePicture"
      FROM user_accounts u
      WHERE email = $1
      `, [email]
    )
    .then(results => {
      res.status(200).json(results.rows)
    })
    .catch(err => console.log('error executing query', err.stack))
}


module.exports = {
  createUser,
  getUpdatedData
};
