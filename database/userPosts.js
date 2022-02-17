const pool = require('../database/config.js');
const express = require('express');

const getPosts = async (req, res) => {
  await pool
    .query(
      `
      SELECT
        u.id AS user_id,
        p.id AS post_id,
        pj.id AS project_id,
        u.profilePicture,
        p.timePosted,
        u.username,
        p.postLikes,
        p.postSaved,
        p.postText,
        p.tags,
        projectAudioLink,
        projectTitle,
        projectLength
      FROM user_accounts u
      LEFT JOIN posts p ON u.id = p.user_id
      LEFT JOIN projects pj ON pj.post_id = p.id
      `
    )
    .then(results => {
      res.status(200).json(results.rows)
    })
    .catch(err => console.log('error executing query', err.stack))
  pool.end().then(() => console.log('pool has ended'))
};


const postPost = async (req, res) => {
  const { timePosted, username, postLikes, postSaved, postText, tags, projectAudioLink, projectTitle, projectImageLink, projectLength } = req.body;
  const query1 = "INSERT INTO posts (timePosted, postText, tags, user_id) VALUES ($1, $2, $3, (SELECT id FROM user_accounts WHERE username = $4) ) RETURNING *"
  const query2 = "INSERT INTO projects (projecttitle, projectlength, projectImage, post_id) VALUES ($1, $2, $3, (SELECT max(id) FROM posts) ) RETURNING *"
  await pool
    .query(query1, [timePosted, postText, tags, username])
    .then(results => {
      console.log('insert into projects table complete');
    })
    .then(() => {
      pool.query(query2, [projectTitle, projectLength, projectImageLink])
    })
    .then(results => {
      console.log('insert into posts table complete')
      res.status(201).json('inserts complete!')
    })
    .catch(err => {
      console.log(err.stack)
    })
};

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