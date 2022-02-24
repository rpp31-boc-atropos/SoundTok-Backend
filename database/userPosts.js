const pool = require('../database/config.js');
const express = require('express');

//front page -
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
      FROM posts p
      LEFT JOIN user_accounts u ON p.user_id = u.id
      LEFT JOIN hashtags h ON p.id = h.post_id
      WHERE p.published = TRUE
      ORDER BY p.id DESC
      `
    )
    .then(results => {
      res.status(200).json(results.rows)
    })
    .catch(err => console.log('error executing query', err.stack))
};


const postPost = async (req, res) => {
  //console.log(req.body)
  let { tracks, userId, timePosted, username, postLikes, postText, tags, projectAudioLink, projectTitle, projectImageLink, projectLength } = req.body;
  const query1 = "INSERT INTO posts (isDraft, timePosted, postLikes, postText, projectAudioLink, projectTitle, projectImageLink, projectLength, user_id, tracks) VALUES (False, $1, $2, $3, $4, $5, $6, $7, (SELECT id FROM user_accounts WHERE username = $8), $9 ) RETURNING *"
  const query2 = "INSERT INTO hashtags (hashtagArr, post_id) VALUES ($1, (SELECT max(id) FROM posts) ) RETURNING *"
  await pool
    .query(query1, [timePosted, postLikes, postText, projectAudioLink, projectTitle, projectImageLink, projectLength, username, JSON.stringify(tracks)])
    .then(results => {
      console.log(`inserted ${projectTitle} into posts table complete`);
    })
    .then(() => {
      pool.query(query2, [JSON.stringify(tags)])
    })
    .then(results => {
      console.log(`inserted ${tags} into the hashtags table`)
      res.status(201).json(`inserted ${tags} / ${projectTitle} into the hashtags and projects tables`)
    })
    .catch(err => {
      console.log(err.stack)
    })
};

const deletePost = async (req, res) => {

}

const updateLikes = async (req, res) => {

}

const updateSave = async (req, res) => {

}

//filter by one hashtag
const getHashtagPosts = async (req, res) => {
  const { tag } = req.params;
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
      CROSS JOIN LATERAL JSONB_ARRAY_ELEMENTS((hashtagArr))
      CROSS JOIN LATERAL JSONB_OBJECT_KEYS(value) where jsonb_object_keys = $1
      `, [tag]
    )
    .then(results => {
      res.status(200).json(results.rows)
    })
    .catch(err => console.log('error executing query', err.stack))
}






module.exports = {
  getPosts,
  postPost,
  updateLikes,
  updateSave,
  getHashtagPosts
};