import { redisClient } from '../config/redis';
import { CalculationRequest } from '../models/CalculationRequest';
import { CalculationResponse } from '../models/CalculationResponse';

function getCacheKey(req: CalculationRequest): string {
  return `calc:${req.operand1}:${req.operand2}:${req.operation}`;
}

export async function getCachedResult(req: CalculationRequest): Promise<CalculationResponse | null> {
  try {
    const cached = await redisClient.get(getCacheKey(req));
    if (cached) {
      return JSON.parse(cached) as CalculationResponse;
    }
    return null;
  } catch (err) {
    console.error('Cache get error:', err);
    return null;
  }
}

export async function setCachedResult(req: CalculationRequest, response: CalculationResponse): Promise<void> {
  try {
    const ttl = parseInt(process.env.CACHE_TTL_SECONDS || '3600', 10);
    await redisClient.setex(getCacheKey(req), ttl, JSON.stringify(response));
  } catch (err) {
    console.error('Cache set error:', err);
  }
}