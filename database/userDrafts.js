const pool = require('../database/config.js');
const express = require('express');

// get all drafts for provided username
const getUserDrafts = async (req, res) => {
  const { username } = req.params;

  await pool
    .query(
      `
      SElECT
        d.id AS draft_id,
        u.id AS user_id,
        d.name AS name,
        d.date AS date,
        d.tracks AS tracks
      FROM user_accounts u
      JOIN drafts d ON u.id = d.user_id
      WHERE u.username = $1
      ORDER BY d.date DESC
      `, [username]
    )
    .then(results => {
      res.status(200).json(results.rows)
    })
    .catch(err => console.log('error executing query', err.stack))
};

const postDraft = async (req, res) => {
  const { username, name, date, tracks } = req.body;
  const query1 = "INSERT INTO drafts (user_id, name, date, tracks) VALUES ((SELECT id FROM user_accounts WHERE username = $1), $2, $3, $4) RETURNING *";
  await pool
    .query(query1, [username, name, date, tracks])
    .then(results => {
      console.log(`inserted ${name} into drafts table complete`);
      res.status(201).json(`inserted ${name} into drafts table`)
    })
    .catch(err => {
      console.log(err.stack)
    })
};


module.exports = {
  getUserDrafts,
  postDraft
};