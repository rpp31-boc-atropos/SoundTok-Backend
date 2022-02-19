const pool = require('../database/config.js');
const express = require('express');


const getUserProjects = async (req, res) => {
  await pool
    .query(
      `
      SElECT
        u.id AS "userId",
        u.profilePicture AS "profilePicture",
        u.username AS username,
        jsonb_agg(jsonb_build_object(
          'postId', p.id,
          'projectId', pj.id,
          'timePosted', p.timePosted,
          'postLikes', p.postLikes,
          'postSaved', p.postSaved,
          'postText', p.postText,
          'tags', p.tags,
          'projectAudioLink', pj.projectAudioLink,
          'projectTitle', pj.projectTitle,
          'projectLength', pj.projectLength
        )) as projectData
      FROM user_accounts u
      LEFT JOIN posts p ON u.id = p.user_id
      LEFT JOIN projects pj ON pj.post_id = p.id
      WHERE u.username = $1
      GROUP BY u.id
      `, ['stella']
    )
    .then(results => {
      res.status(200).json(results.rows)
    })
    .catch(err => console.log('error executing query', err.stack))
};

module.exports = {
  getUserProjects
};