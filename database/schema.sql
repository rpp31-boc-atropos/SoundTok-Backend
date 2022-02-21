--npm run pgtest if you want to populate table first time
--npm run pg if you just want to run postgres

DROP DATABASE soundtok;
CREATE DATABASE soundtok;

--Edit tables as needed
DROP TABLE IF EXISTS user_accounts;
CREATE TABLE user_accounts (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) DEFAULT 'no',
  username VARCHAR(100),
  user_bio VARCHAR(500),
  profilePicture VARCHAR(300),
  post_id INT, --may not need
  user_id INT --may not need
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
  postText VARCHAR(500),
  projectAudioLink VARCHAR(200),
  projectTitle VARCHAR(200),
  projectLength INT,
  projectImageLink VARCHAR(200),
  tracks JSONB, --will try it this way first and add separate table if it works better
  user_id INT
);

INSERT INTO posts (timePosted, postLikes, postSaved, postText, projectAudioLink, projectTitle, projectLength, projectImageLink, user_id)
VALUES('2022-02-11T18:34:49.915-08:00', 123, false, 'Chicago, im SO excited, to hold you guys over until then, heres a #teaser :)','https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Kai_Engel/Satin/Kai_Engel_-_03_-_Contention.mp3','hay fever', 239, 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Yawning_horse%2C_Scotland.jpg/640px-Yawning_horse%2C_Scotland.jpg',  1),
('2022-02-04T18:34:49.915-08:00', 123, false, 'hi frieeeeends im a rabbit and this my first track boom. #haymama #first','https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Kai_Engel/Satin/Kai_Engel_-_01_-_Augmentations.mp3', 'first song man', 283, 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Yawning_horse%2C_Scotland.jpg/640px-Yawning_horse%2C_Scotland.jpg',  2),
('2022-01-11T18:34:49.915-08:00', 123, false, 'I have been waiting to release this for so long. pls no hate thx. #meow','https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Yawning_horse%2C_Scotland.jpg/640px-Yawning_horse%2C_Scotland.jpg', 'group moew 1', 98, 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Yawning_horse%2C_Scotland.jpg/640px-Yawning_horse%2C_Scotland.jpg',  3),
('2022-01-11T18:34:49.915-08:00', 123, false, 'Chicago, im SO excited, to hold you guys over until then, heres a #teaser :)', 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Kai_Engel/Satin/Kai_Engel_-_03_-_Contention.mp3', 'hay mama THIS panda', 239, 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Yawning_horse%2C_Scotland.jpg/640px-Yawning_horse%2C_Scotland.jpg',  1),
('2021-12-04T18:34:49.915-08:00', 123, false, 'hi frieeeeends im a rabbit and this my first track boom. #haymama #first', 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Kai_Engel/Satin/Kai_Engel_-_01_-_Augmentations.mp3', 'second song man', 283, 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Yawning_horse%2C_Scotland.jpg/640px-Yawning_horse%2C_Scotland.jpg',  2),
('2021-11-11T18:34:49.915-08:00', 123, false, 'I have been waiting to release this for so long. pls no hate thx. #meow', 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Kai_Engel/Satin/Kai_Engel_-_08_-_Downfall.mp3', 'group meow 2', 98, 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Yawning_horse%2C_Scotland.jpg/640px-Yawning_horse%2C_Scotland.jpg',  3);



DROP TABLE IF EXISTS hashtags;
CREATE TABLE hashtags (
  id SERIAL PRIMARY KEY,
  hashtagArr JSONB,
  tag VARCHAR(200), --in case the array doesn't work out
  index INT,  --in case the array doesn't work out
  post_id INT, --may not need
  user_id INT --may not need
);

INSERT INTO hashtags (hashtagArr, tag, index, post_id)
VALUES('[{"teaser": 70}]', 'teaser', 70, 1),
('[{"teaser": 70}]', 'teaser', 70, 3),
('[{"teaser": 70}]', 'teaser', 70, 4);


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
