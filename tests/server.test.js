const app = require('../server/index.js');
const request = require('supertest');
const db = require("../database/config.js");

describe('Example Jest Test', () => {
  test('1+1=2', () => {
    expect(1 + 1).toBe(2);
  });
});
/*
beforeAll(async () => {
  //await db.query("CREATE TABLE posts (id SERIAL PRIMARY KEY, timePosted TIMESTAMP,postLikes INT DEFAULT 0, postSaved BOOLEAN DEFAULT FALSE, postText VARCHAR(500), projectAudioLink VARCHAR(10000), projectTitle VARCHAR(200), projectLength INT, projectImageLink VARCHAR(10000), user_id INT, published BOOLEAN DEFAULT FALSE, tracks JSONB)");
});

beforeEach(async () => {
  // seed with some data
  await db.query("INSERT INTO posts (postText) VALUES ('test1'), ('test2')");
});

afterEach(async () => {
  //await db.query("DELETE FROM students");
});
beforeEach(async () => {
  // seed with some data
  await db.query("INSERT INTO posts (postText) VALUES ('test1'), ('test2')");
});

*/



afterAll(async () => {
  db.end();
});

describe("GET / ", () => {
  test('GET / should retrieve all posts', async () => {
    const res = await request(app).get('/')
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        "postId": expect.any(Number),
        "projectAudioLink": expect.any(String),
        "projectImageLink": expect.any(String)
      })
    ]))
  })
});




/*
describe('Example Jest Test', () => {
  test('1+1=2', () => {
    expect(1 + 1).toBe(2);
  });
});

describe('User Feed Endpoints', () => {

  test('GET / should retrieve all posts', async () => {
    const res = await requestWithSupertest.get('/')
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        "postId": expect.any(Number),
        "projectAudioLink": expect.any(String),
        "projectImageLink": expect.any(String)
      })
    ]))
  })

  test('POST / should add a new post to the feed', async () => {
    const res = await requestWithSupertest.post('/').send({
      "profilePicture": "https://i.pinimg.com/474x/a3/89/f5/a389f597020f361f7f6d9b79323598fc.jpg",
      "userEmail": "test@gmail.com",
      "projectImageLink": "https://f4.bcbits.com/img/a1401519182_11.jpg",
      "timePosted": "2022-01-11T18:34:49.915-08:00",
      "username": "test",
      "postText": "i got my fav bugs yesterday, so today the #inspiration hit",
      "tags": [{ "inspiration": 42 }],
      "projectAudioLink": "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Kai_Engel/Satin/Kai_Engel_-_03_-_Contention.mp3",
      "projectTitle": "a bugs life is in my mouth",
      "projectLength": 102,
      "tracks": []
    })
    expect(res.statusCode).toBe(201)
  })

  test('DELETE /deletePost should delete a post', async () => {
    const res = await requestWithSupertest.delete('/deletePost').send({
      postId: 1
    })
    expect(res.statusCode).toBe(204)
  })

});
*/