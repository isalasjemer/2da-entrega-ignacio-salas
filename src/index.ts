import { createApp } from './config/express';
import http from 'http';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  const app = await createApp();

  const server = http.createServer(app).listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
  });

  server.on('error', (err) => {
    console.log(err);
  });
};

startServer().catch((err) => console.log(err));
