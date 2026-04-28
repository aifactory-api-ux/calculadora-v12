import Redis from 'ioredis';

jest.mock('ioredis', () => {
  const mRedis = {
    get: jest.fn(),
    setex: jest.fn(),
    connect: jest.fn(),
    on: jest.fn(),
  };
  return jest.fn(() => mRedis);
});

describe('Redis Client', () => {
  it('should create a redis client', () => {
    const Redis = require('ioredis');
    const client = new Redis();
    expect(client).toBeDefined();
  });
});