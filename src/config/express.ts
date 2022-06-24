import express, { Application } from 'express';
import { router } from '../routes';

export const createApp = (): Application => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/api', router);

  app.get('/health', (_req, res) => {
    res.send('Running 1');
  });

  return app;
};
