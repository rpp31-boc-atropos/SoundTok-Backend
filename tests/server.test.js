//const app = require('../server/index.js');
const request = require('supertest');

describe('Example Jest Test', () => {
  test('1+1=2', () => {
    expect(1 + 1).toBe(2);
  });
});