--npm run pgtest if you want to populate table first time
--npm run pg if you just want to run postgres

DROP DATABASE IF EXISTS soundtok;
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

INSERT INTO user_accounts (username, profilePicture)
VALUES ('stella', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Yawning_horse%2C_Scotland.jpg/640px-Yawning_horse%2C_Scotland.jpg'),
('panda', 'https://home.adelphi.edu/~ne21709/bunny2.jpg'),
('atrophos', 'https://i.pinimg.com/474x/a3/89/f5/a389f597020f361f7f6d9b79323598fc.jpg');

DROP TABLE IF EXISTS posts;
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  timePosted TIMESTAMP,
  postLikes INT DEFAULT 0,
  postSaved BOOLEAN DEFAULT FALSE,
  postText VARCHAR(200),
  tags JSONB,
  user_id INT
);

INSERT INTO posts (timePosted, postLikes, postSaved, postText, tags, user_id)
VALUES ('2022-02-10 10:23:54+02', 123, false, 'rabbit thinks he is the only one who likes #haymama. well check this track out', '["haymama"]', 1),
('2022-01-19 10:23:54+02', 123, false, 'hi frieeeeends im a rabbit and this my first track boom. #haymama #first', '["haymama", "first"]', 2),
('2021-10-19 10:23:54+02', 123, false, 'I have been waiting to release this for so long. pls no hate thx. #meow', '["meow"]', 3),
('2022-02-12 10:23:54+02', 123, false, 'Stella made another post! #anothaone', '["anothaone"]', 1);

DROP TABLE IF EXISTS projects;
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  projectAudioLink VARCHAR(200),
  projectTitle VARCHAR(100),
  projectImage VARCHAR(200),
  projectLength INT,
  post_id INT
 -- user_id INT --not using this
 );

INSERT INTO projects (projectAudioLink, projectTitle, projectLength, projectImage, post_id)
VALUES
('some audio link', 'group meow', 239, 'no image', 1),
('https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Kai_Engel/Satin/Kai_Engel_-_01_-_Augmentations.mp3', 'first song man', 283, 'image',2),
('https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Kai_Engel/Satin/Kai_Engel_-_08_-_Downfall.mp3', 'group meow 1', 98, 'image', 3),
('https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Kai_Engel/Satin/Kai_Engel_-_08_-_Downfall.mp3', 'group meow 1', 98, 'image', 4);


/* data not finalized below
Once it's POST - flattens into url track and has to go into projects table
*/

DROP TABLE IF EXISTS tracks;
CREATE TABLE tracks (
  id SERIAL PRIMARY KEY,
  trackImage VARCHAR(200),
  track_title VARCHAR(100),
  track_url VARCHAR(100),
  track_description VARCHAR(500),
  track_image VARCHAR(100)
);

DROP TABLE IF EXISTS drafts;
CREATE TABLE drafts (
  id SERIAL PRIMARY KEY
);

--Dropping the tables
/*
DROP TABLE user_accounts;
DROP TABLE posts;
DROP TABLE projects;
DROP TABLE tracks;
DROP TABLE drafts;
DROP TABLE hashtags;
*/
