const Pool = require('pg').Pool;
const dotenv = require('dotenv');
const result = dotenv.config();

const pool = new Pool({
  user: process.env.DB_USR || 'postgres',
  password: process.env.DB_PASS || '',
  host: process.env.DB_HOST || '',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'soundtok'
});

module.exports = pool;
