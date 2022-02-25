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
      JOIN posts p ON u.id = p.user_id
      LEFT JOIN hashtags h ON p.id = h.post_id
      WHERE u.username = $1
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

//remove post from profile
const removePost = async (req, res) => {
  const { postId } = req.body;
  pool
    .query(`DELETE FROM posts WHERE id = $1`, [postId])
    .then(result => res.status(204))
    .catch(err => {
      console.log('error executing delete', err.stack)
      res.status(404).json(`something went wrong: ${err}`)
      }
    )
}

module.exports = {
  getUserProjects,
  updateProfile,
  removePost
};