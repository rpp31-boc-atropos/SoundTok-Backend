const server = require('./server.js');

describe('Example Jest Test', () => {
  test('1+1=2', () => {
    expect(1+2).toBe(2);
  })
});