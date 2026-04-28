import { Request, Response } from 'express';
import { getLogs } from '../services/logService';
import { logger } from '../config/logger';

export function getLogsHandler(_req: Request, res: Response): void {
  const logs = getLogs();
  logger.info('Logs retrieved', { count: logs.length });
  res.json(logs);
}