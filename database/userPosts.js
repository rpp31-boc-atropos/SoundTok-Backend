const pool = require('../database/config.js');
const express = require('express');

const getPosts = async (req, res) => {
  await pool
    .query(
      `
      SELECT
        u.id AS "userId",
        p.id AS "postId",
        pj.id AS "projectId",
        u.profilePicture AS "profilePicture",
        p.timePosted AS "timePosted",
        u.username AS username,
        p.postLikes AS "postLikes",
        p.postSaved AS "postSaved",
        p.postText AS "postText",
        p.tags AS tags,
        pj.projectAudioLink AS "projectAudioLink",
        pj.projectTitle AS "projectTitle",
        pj.projectLength AS "projectLength"
      FROM user_accounts u
      LEFT JOIN posts p ON u.id = p.user_id
      LEFT JOIN projects pj ON pj.post_id = p.id
      `
    )
    .then(results => {
      res.status(200).json(results.rows)
    })
    .catch(err => console.log('error executing query', err.stack))
};


const postPost = async (req, res) => {
  const { userId, timePosted, username, postLikes, postSaved, postText, tags, projectAudioLink, projectTitle, projectLength } = req.body;
  const query1 = "INSERT INTO posts (timePosted, postText, tags, user_id) VALUES ($1, $2, $3, (SELECT id FROM user_accounts WHERE username = $4) ) RETURNING *"
  const query2 = "INSERT INTO projects (projectAudioLink, projecttitle, projectlength, post_id) VALUES ($1, $2, $3, (SELECT max(id) FROM posts) ) RETURNING *"
  await pool
    .query(query1, [timePosted, postText, tags, username])
    .then(results => {
      console.log('insert into projects table complete');
    })
    .then(() => {
      pool.query(query2, [projectAudioLink, projectTitle, projectLength])
    })
    .then(results => {
      console.log('insert into posts table complete')
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