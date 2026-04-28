import request from 'supertest';
import app from '../src/app';

jest.mock('../src/services/cacheService', () => ({
  getCachedResult: jest.fn().mockResolvedValue(null),
  setCachedResult: jest.fn().mockResolvedValue(undefined),
}));

describe('POST /api/calculate', () => {
  it('should return 200 for valid add request', async () => {
    const response = await request(app)
      .post('/api/calculate')
      .send({ operand1: 5, operand2: 3, operation: 'add' })
      .expect(200);

    expect(response.body).toHaveProperty('result');
    expect(response.body).toHaveProperty('cached');
    expect(response.body.result).toBe(8);
  });

  it('should return 200 for valid subtract request', async () => {
    const response = await request(app)
      .post('/api/calculate')
      .send({ operand1: 10, operand2: 4, operation: 'subtract' })
      .expect(200);

    expect(response.body.result).toBe(6);
  });

  it('should return 400 for invalid operation', async () => {
    const response = await request(app)
      .post('/api/calculate')
      .send({ operand1: 5, operand2: 3, operation: 'multiply' })
      .expect(400);

    expect(response.body).toHaveProperty('error');
  });

  it('should return 400 for missing operand1', async () => {
    const response = await request(app)
      .post('/api/calculate')
      .send({ operand2: 3, operation: 'add' })
      .expect(400);

    expect(response.body).toHaveProperty('error');
  });
});