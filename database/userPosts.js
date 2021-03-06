const pool = require('../database/config.js');
const express = require('express');
const transformUrl = require('./transformUrl.js');

//front page
const getPosts = async (req, res) => {
  await pool
    .query(
      `
      SELECT
        u.id AS "userId",
        p.id AS "postId",
        u.username AS "username",
        u.email AS "userEmail",
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
      ORDER BY p.timePosted DESC
      `
    )
    .then(results => {
      res.status(200).json(results.rows)
    })
    .catch(err => console.log('error executing query', err.stack))
};


const postPost = async (req, res) => {
  let { published, tracks, userId, timePosted, username, postLikes, postText, tags, projectAudioLink, projectTitle, projectImageLink, projectLength } = req.body;
  if ( projectImageLink === null || projectImageLink === undefined ) {
    projectImageLink = 'https://res.cloudinary.com/xoxohorses/image/upload/v1646452887/default_j1zdrg.jpg';
  }
  projectImageLink = transformUrl(projectImageLink) || projectImageLink;

  const query1 = "INSERT INTO posts (published, timePosted, postLikes, postText, projectAudioLink, projectTitle, projectImageLink, projectLength, user_id, tracks) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, (SELECT id FROM user_accounts WHERE username = $9), $10 ) RETURNING *"
  const query2 = "INSERT INTO hashtags (hashtagArr, post_id) VALUES ($1, (SELECT max(id) FROM posts) ) RETURNING *"
  await pool
    .query(query1, [published, timePosted, postLikes, postText, projectAudioLink, projectTitle, projectImageLink, projectLength, username, JSON.stringify(tracks)])
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

//remove post from profile
const removePost = async (req, res) => {
  const { postId } = req.body;
  let query1 = `DELETE FROM posts WHERE id = $1`;
  let query2 = `DELETE FROM hashtags WHERE post_id = $1`;
  await pool
    .query(query1, [postId])
    .then(result => {
      console.log('deleted post from POSTS table')
    })
    .then(() => {
      pool.query(query2, [postId])
      res.status(204).json(`post IDs deleted from tables`)
    })
    .catch(err => {
      console.log('error executing delete', err.stack)
      res.status(404).json(`something went wrong: ${err}`)
    })
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

//get hashtag list by search term
const getHashtagSearch = async (req, res) => {
  let { search } = req.query
  search = '%' + search + '%'
  await pool
  .query(
      `SELECT DISTINCT str.txt
      FROM (SELECT CAST(JSONB_OBJECT_KEYS(JSONB_ARRAY_ELEMENTS(hashtagarr)) as varchar) as txt
      FROM hashtags) str WHERE str.txt like $1`, [search]
    )
    .then(results => res.status(200).json(results.rows))
    .catch(err => console.log('error executing query', err.stack))
}




module.exports = {
  getPosts,
  postPost,
  getHashtagPosts,
  getHashtagSearch,
  removePost
};

