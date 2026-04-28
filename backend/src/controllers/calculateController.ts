import { Request, Response } from 'express';
import { CalculationRequest } from '../models/CalculationRequest';
import { CalculationResponse } from '../models/CalculationResponse';
import { CalculationLog } from '../models/CalculationLog';
import { validateCalculationRequest } from '../utils/validation';
import { getCachedResult, setCachedResult } from '../services/cacheService';
import { logCalculation } from '../services/logService';
import { logger } from '../config/logger';

export async function calculateHandler(req: Request, res: Response): Promise<void> {
  const validation = validateCalculationRequest(req.body);

  if (!validation.valid) {
    logger.warn('Invalid calculation request', { error: validation.error });
    res.status(400).json({ error: validation.error });
    return;
  }

  const { operand1, operand2, operation } = validation.data;

  const cacheKey = { operand1, operand2, operation };
  const cachedResponse = await getCachedResult(cacheKey);

  if (cachedResponse) {
    const logEntry: CalculationLog = {
      timestamp: new Date().toISOString(),
      operand1,
      operand2,
      operation,
      result: cachedResponse.result,
      cached: true,
    };
    logCalculation(logEntry);

    logger.info('Calculation served from cache', { operand1, operand2, operation, result: cachedResponse.result });
    res.json(cachedResponse);
    return;
  }

  let result: number;
  if (operation === 'add') {
    result = operand1 + operand2;
  } else {
    result = operand1 - operand2;
  }

  result = Math.round(result * 100) / 100;

  const response: CalculationResponse = { result, cached: false };

  await setCachedResult(cacheKey, response);

  const logEntry: CalculationLog = {
    timestamp: new Date().toISOString(),
    operand1,
    operand2,
    operation,
    result,
    cached: false,
  };
  logCalculation(logEntry);

  logger.info('Calculation performed', { operand1, operand2, operation, result });
  res.json(response);
}