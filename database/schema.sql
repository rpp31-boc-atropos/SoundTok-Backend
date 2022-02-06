DROP DATABASE IF EXISTS soundTok;
CREATE DATABASE soundTok;

--Edit tables as needed

CREATE TABLE user_accounts (
  id INT NOT NULL PRIMARY KEY,
  track_id INT NOT NULL,
  username VARCHAR(100),
  password VARCHAR(30),
  profile_pic VARCHAR(100)
);

CREATE TABLE projects (
  id INT NOT NULL PRIMARY KEY,
  user_id INT,
  track_id INT,
  draft_id INT,
  project_description VARCHAR(300),
  project_image VARCHAR(100)
);

CREATE TABLE tracks (
  id INT NOT NULL PRIMARY KEY,
  project_id INT,
  title VARCHAR(100),
  track_url VARCHAR(100),
  track_description VARCHAR(500),
  track_image VARCHAR(100)
)

CREATE TABLE drafts (
  id INT NOT NULL PRIMARY KEY
);

CREATE TABLE hashtags (
  id INT NOT NULL PRIMARY KEY,
  tag VARCHAR(100)
);

--Dropping the tables
/*
DROP TABLE user_accounts;
DROP TABLE projects;
DROP TABLE tracks;
DROP TABLE drafts;
DROP TABLE hashtags;
*/