const pool = require('../database/config.js');
const express = require('express');


const createUser = (req, res) => {
  pool.query(
    `
    `,
    (err, results) => {
      if (error) {
        throw error;
      }
      res.status(201);
    }
  );
};

const getPosts = (req, res) => {
  pool.query(
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
  `,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
};



module.exports = {
  createUser,
  getPosts
};