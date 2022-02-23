const pool = require('../database/config.js');
const express = require('express');

// get all drafts for provided username
const getUserDrafts = async (req, res) => {
  const { username } = req.params;
  await pool
    .query(
      `
      SELECT
        u.id AS "userId",
        u.username AS "username",
        p.projectAudioLink AS "projectAudioLink",
        p.projectTitle AS "projectTitle",
        p.projectLength AS "projectLength",
        p.tracks AS "tracks"
      FROM posts p
      JOIN user_accounts u ON p.user_id = u.id
      WHERE p.published = FALSE AND u.username = $1
      ORDER BY p.id DESC
      `, [username]
    )
    .then(results => {
      res.status(200).json(results.rows)
    })
    .catch(err => console.log('error executing query', err.stack))
};

const postDraft = async (req, res) => {
  const { username, projectTitle, projectLength, projectAudioLink, tracks } = req.body;
  const query1 = "INSERT INTO posts (user_id, projectTitle, projectLength, projectAudioLink, tracks) VALUES ((SELECT id FROM user_accounts WHERE username = $1), $2, $3, $4, $5) RETURNING *";
  await pool
    .query(query1, [username, projectTitle, projectLength, projectAudioLink, tracks])
    .then(results => {
      console.log(`inserted ${projectTitle} into drafts table complete`);
      res.status(201).json(`inserted ${projectTitle} into drafts table`)
    })
    .catch(err => {
      console.log(err.stack)
    })
};


module.exports = {
  getUserDrafts,
  postDraft
};