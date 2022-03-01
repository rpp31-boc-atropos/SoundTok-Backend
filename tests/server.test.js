const app = require('../server/index.js');
const request = require('supertest');
const requestWithSupertest = request(app);

describe('Example Jest Test', () => {
  test('1+1=2', () => {
    expect(1 + 1).toBe(2);
  });
});

describe('Feed Endpoints', () => {

  it('GET / should show all posts', async () => {
    const res = await requestWithSupertest.get('/');
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));

  });

});