const Pool = require('pg').Pool;
const dotenv = require('dotenv');
const result = dotenv.config();

/*
if (result.error) {
  throw result.error;
}
*/


const pool = new Pool({
  user: 'jlxtyoekaxwghw',
  password: 'dchtq9jhrcvlbv',
  host: 'ec2-3-227-55-25.compute-1.amazonaws.com',
  port: 5432,
  database: 'dchtq9jhrcvlbv'
});

module.exports = pool;
