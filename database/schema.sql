--npm run pgtest if you want to populate table first time
--npm run pg if you just want to run postgres

DROP DATABASE soundtok;
CREATE DATABASE soundtok;

--Edit tables as needed
DROP TABLE IF EXISTS user_accounts;
CREATE TABLE user_accounts (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100),
  username VARCHAR(100),
  user_bio VARCHAR(500),
  profilePicture VARCHAR(300)
);

DROP TABLE IF EXISTS posts;
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  timePosted TIMESTAMP,
  isDraft BOOLEAN,
  postLikes INT DEFAULT 0,
  postSaved BOOLEAN DEFAULT FALSE,
  postText VARCHAR(500),
  projectAudioLink VARCHAR(10000),
  projectTitle VARCHAR(200),
  projectLength INT,
  projectImageLink VARCHAR(10000),
  user_id INT,
  published BOOLEAN DEFAULT FALSE,
  tracks JSONB
);

DROP TABLE IF EXISTS hashtags;
CREATE TABLE hashtags (
  id SERIAL PRIMARY KEY,
  hashtagArr JSONB,
  post_id INT
);

DROP TABLE IF EXISTS drafts;