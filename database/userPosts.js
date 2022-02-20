const pool = require('../database/config.js');
const express = require('express');

const getPosts = async (req, res) => {
  await pool
    .query(
      `
      SELECT
        u.id AS "userId",
        u.username AS "username",
        u.profilePicture AS "profilePicture",
        p.timePosted AS "timePosted",
        p.postSaved AS "postSaved",
        p.postText AS "postText",
        h.hashtagArr AS "tags",
        p.projectAudioLink AS "projectAudioLink",
        p.projectTitle AS "projectTitle",
        p.projectLength AS "projectLength",
        p.projectImageLink AS "projectImageLink"
      FROM user_accounts u
      LEFT JOIN posts p ON u.id = p.user_id
      LEFT JOIN hashtags h ON p.id = h.post_id
      `
    )
    .then(results => {
      res.status(200).json(results.rows)
    })
    .catch(err => console.log('error executing query', err.stack))
};


const postPost = async (req, res) => {
  const { userId, timePosted, username, postLikes, postSaved, postText, tags, projectAudioLink, projectTitle, projectImageLink, projectLength } = req.body;
  const query1 = "INSERT INTO posts (timePosted, postLikes, postSaved, postText, projectAudioLink, projectTitle, projectImageLink, projectLength, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, (SELECT id FROM user_accounts WHERE username = $9) ) RETURNING *"
  const query2 = "INSERT INTO hashtags (hashtagArr, post_id) VALUES ($1, (SELECT max(id) FROM posts) ) RETURNING *"
  await pool
    .query(query1, [timePosted, postLikes, postSaved, postText, projectAudioLink, projectTitle, projectImageLink, projectLength, username])
    .then(results => {
      console.log('insert into posts table complete');
    })
    .then(() => {
      pool.query(query2, [tags])
    })
    .then(results => {
      console.log('insert into hashtags table complete')
      res.status(201).json('inserts complete!')
    })
    .catch(err => {
      console.log(err.stack)
    })
};

const deletePost = async (req, res) => {

}

//stretch
const updateLikes = async (req, res) => {

}

const updateSave = async (req, res) => {

}





module.exports = {
  getPosts,
  postPost,
  updateLikes,
  updateSave
};