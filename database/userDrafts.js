const pool = require('../database/config.js');
const express = require('express');

// get all drafts for provided username
const getUserDrafts = async (req, res) => {
  const { email } = req.params;
  console.log(email);
  await pool
    .query(
      `
      SELECT
        u.id AS "userId",
        p.id AS "postId",
        u.username AS "username",
        u.email AS "userEmail",
        p.timePosted AS "timePosted",
        p.postLikes AS "postLikes",
        p.postText AS "postText",
        p.projectAudioLink AS "projectAudioLink",
        p.projectTitle AS "projectTitle",
        p.projectLength AS "projectLength",
        p.projectImageLink AS "projectImageLink",
        p.published AS "published",
        p.tracks AS "tracks"
      FROM posts p
      JOIN user_accounts u ON p.user_id = u.id
      WHERE p.published = FALSE AND u.email = $1
      ORDER BY p.id DESC
      `, [email]
    )
    .then(results => {
      res.status(200).json(results.rows)
    })
    .catch(err => console.log('error executing query', err.stack))
};

const postDraft = async (req, res) => {
  const { email, projectTitle, projectLength, projectAudioLink, tracks, timePosted } = req.body;
  const query1 = "INSERT INTO posts (user_id, projectTitle, projectLength, projectAudioLink, tracks, published, timePosted) VALUES ((SELECT id FROM user_accounts WHERE email = $1), $2, $3, $4, $5, FALSE, $6) RETURNING *";
  await pool
    .query(query1, [email, projectTitle, projectLength, projectAudioLink, tracks, timePosted])
    .then(results => {
      console.log(`inserted ${projectTitle} into drafts table complete`);
      res.status(201).json(`inserted ${projectTitle} into drafts table`);
    })
    .catch(err => {
      console.log(err.stack)
    })
};

const getDraftById = async (req, res) => {
  const { postId } = req.params;
  await pool
    .query(
      `
      SELECT *
      FROM posts p
      JOIN user_accounts u ON p.user_id = u.id
      WHERE p.id = $1
      `, [postId]
    )
    .then(results => {
      res.status(200).json(results.rows)
    })
    .catch(err => console.log('error executing query', err.stack))
};


module.exports = {
  getUserDrafts,
  postDraft,
  getDraftById
};