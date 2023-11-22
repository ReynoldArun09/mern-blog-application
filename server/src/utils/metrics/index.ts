import { Response, Request, Router } from 'express';
import client from 'prom-client';

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

export const metricsRouter = Router();

metricsRouter.get('/metrics', async (req: Request, res: Response) => {
  res.setHeader('Content-Type', client.register.contentType);
  const metrics = await client.register.metrics();
  res.send(metrics);
});

export const responseTimeHistogram = new client.Histogram({
  name: 'api_response_time_duration_seconds',
  help: 'REST API time in second',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 5, 15, 50, 100, 500],
});

export const totalReqCounter = new client.Counter({
  name: 'api_total_request',
  help: 'REST REQUEST count',
});
