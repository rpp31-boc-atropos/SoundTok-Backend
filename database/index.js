const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'soundtok',
  password: process.env.DB_PASS || '',
  port: process.env.DB_PORT || 5432
});

pool.on('error', (err, client) => {
  console.error('Unexpected error: ', err);
  process.exit(-1);
});

module.exports = pool;