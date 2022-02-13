DROP DATABASE IF EXISTS soundtok;
CREATE DATABASE soundtok;

--Edit tables as needed

CREATE TABLE user_accounts (
  id INT NOT NULL PRIMARY KEY,
  email VARCHAR(100),
  username VARCHAR(100),
  user_bio VARCHAR(500),
  profilePicture VARCHAR(300)
);

INSERT INTO user_accounts (id, username, password, profilePicture, post_id)
VALUES (1, 'stella', null, 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Yawning_horse%2C_Scotland.jpg/640px-Yawning_horse%2C_Scotland.jpg', 1),
(2, 'panda', null, 'https://home.adelphi.edu/~ne21709/bunny2.jpg', 2),
(3, 'atrophos', null, 'https://i.pinimg.com/474x/a3/89/f5/a389f597020f361f7f6d9b79323598fc.jpg', 3);

CREATE TABLE posts (
  id INT NOT NULL PRIMARY KEY,
  timePosted TIMESTAMP,
  postLikes INT,
  postSaved BOOLEAN,
  postText VARCHAR(200),
  tags VARCHAR(200),
  user_id INT
);

INSERT INTO posts (id, timePosted, postLikes, postSaved, postText, tags, user_id)
VALUES (1, '2022-02-10 10:23:54+02', 123, false, 'rabbit thinks he is the only one who likes #haymama. well check this track out', '["haymama"]', 1),
(2, '2022-01-19 10:23:54+02', 123, false, 'hi frieeeeends im a rabbit and this my first track boom. #haymama #first', '["haymama", "first"]', 2),
(3, '2021-10-19 10:23:54+02', 123, false, 'I have been waiting to release this for so long. pls no hate thx. #meow', '["meow"]', 3);

CREATE TABLE projects (
  id INT NOT NULL PRIMARY KEY,
  projectAudioLink VARCHAR(200),
  projectTitle VARCHAR(100),
  projectLength INT,
  projectImage VARCHAR(100),
  post_id INT
 );

INSERT INTO projects (id, projectAudioLink, projectTitle, projectLength, projectImage, post_id)
VALUES (1, 'some audio link', 'group meow', 239, 'no image', 1),
(2, 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Kai_Engel/Satin/Kai_Engel_-_01_-_Augmentations.mp3', 'first song man', 283, 'image', 2),
(3, 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Kai_Engel/Satin/Kai_Engel_-_08_-_Downfall.mp3', 'group meow 1', 98, 'image', 3);





CREATE TABLE tracks (
  id INT NOT NULL PRIMARY KEY,
  project_id INT,
  track_title VARCHAR(100),
  track_url VARCHAR(100),
  track_description VARCHAR(500),
  track_image VARCHAR(100)
);

CREATE TABLE drafts (
  id INT NOT NULL PRIMARY KEY
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
