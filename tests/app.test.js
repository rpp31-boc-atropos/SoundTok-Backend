const app = require('../app.js');
const request = require('supertest');

describe('Example Jest Test', () => {
  test('1+1=2', () => {
    expect(1+1).toBe(2);
    console.log('test');

  });
});

describe('Server responds to endpoints', () => {
  test('Server responds to GET requests on /', () => {
    return request(app)
      .get('/')
      .then((res) => {
        expect(res.statusCode).not.toBe(404);
      });
  });
})