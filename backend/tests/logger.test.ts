import winston from 'winston';
import { logger } from '../src/config/logger';

describe('Logger', () => {
  it('should be a winston logger instance', () => {
    expect(logger).toBeInstanceOf(winston.Logger);
  });

  it('should have info level configured', () => {
    expect(logger.level).toBe('info');
  });
});