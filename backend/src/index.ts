import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { connectRedis } from './config/redis';
import { logger } from './config/logger';

const port = parseInt(process.env.PORT || '4000', 10);

async function start(): Promise<void> {
  try {
    await connectRedis();
    logger.info('Redis connection established');

    app.listen(port, '0.0.0.0', () => {
      logger.info(`Backend server running on port ${port}`);
    });
  } catch (err) {
    logger.error('Failed to start server', { error: err });
    process.exit(1);
  }
}

start();