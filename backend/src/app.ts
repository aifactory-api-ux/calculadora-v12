import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import calculateRoutes from './routes/calculate';
import healthRoutes from './routes/health';
import logsRoutes from './routes/logs';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/calculate', calculateRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/logs', logsRoutes);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

export default app;