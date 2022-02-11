const pool = require('../database/config.js');
const express = require('express');


//tracks
const getAllTracks = (request, response) => {
  pool.query(`SELECT * FROM tracks`, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};


module.exports = {
  getAllTracks
};