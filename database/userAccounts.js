const pool = require('../database/config.js');
const express = require('express');


const createUser = async (req, res) => {
  console.log('in here!');
  console.log(req.body);

}


module.exports = {
  createUser
};