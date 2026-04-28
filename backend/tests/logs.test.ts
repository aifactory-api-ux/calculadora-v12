import request from 'supertest';
import app from '../src/app';

describe('GET /api/logs', () => {
  it('should return empty array initially', async () => {
    const response = await request(app).get('/api/logs').expect(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('GET /api/health', () => {
  it('should return ok status', async () => {
    const response = await request(app).get('/api/health').expect(200);
    expect(response.body).toEqual({ status: 'ok' });
  });
});