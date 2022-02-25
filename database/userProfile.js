const pool = require('../database/config.js');
const express = require('express');

const getUserProjects = async (req, res) => {
  const { username } = req.params;

  await pool
    .query(
      `
      SELECT
        u.id AS "userId",
        u.profilePicture AS "profilePicture",
        u.username AS username,
        u.user_bio AS "userBio",
        jsonb_agg(jsonb_build_object(
          'postId', p.id,
          'timePosted', p.timePosted,
          'postLikes', p.postLikes,
          'postSaved', p.postSaved,
          'postText', p.postText,
          'tags', h.hashtagArr,
          'projectAudioLink', p.projectAudioLink,
          'projectTitle', p.projectTitle,
          'projectLength', p.projectLength
        )) as projectData
      FROM user_accounts u
      LEFT JOIN posts p ON u.id = p.user_id
      LEFT JOIN hashtags h ON p.id = h.post_id
      WHERE u.username = $1
      AND p.published = TRUE
      GROUP BY u.id
      `, [username]
    )
    .then(results => {
      res.status(200).json(results.rows)
    })
    .catch(err => console.log('error executing query', err.stack))
};
//update profile pic
const updateProfile = async (req, res) => {
  console.log(req)
  const { username, profilePicture, bio } = req.body;
  pool
    .query(`UPDATE user_accounts SET profilePicture = $1, user_bio=$2 WHERE username = $3`, [profilePicture, bio, username])
    .then(result => {
      console.log(`${username}: user profile updated`)
      res.status(201)
    })
    .catch(err => {
      console.log(err)
    })
}

//get user list by search term
const getUserSearch = async (req, res) => {
  let { search } = req.query
  search = '%' + search + '%'
  await pool
  .query(
      `SELECT DISTINCT u.username
      FROM user_accounts u WHERE u.username like $1`, [search]
    )
    .then(results => res.status(200).json(results.rows))
    .catch(err => console.log('error executing query', err.stack))
}



module.exports = {
  getUserProjects,
  updateProfile,
  getUserSearch
};

