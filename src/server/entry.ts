import cluster from 'node:cluster';
import os from 'node:os';
import path from 'node:path';
import express, { Request, Response, Express } from 'express';
import bodyParser from 'body-parser';
import api from './api';

function startExpressServer() {
  const app: Express = express();
  app.use(express.static(path.resolve(__dirname, '../../../public')));
  app.use(bodyParser.json());

  // JSON API
  api(app);

  // Serve html
  app.get('*', (req: Request, res: Response) => {
    console.log(`Worker ${process.pid} serve index.html`);
    res.sendFile(path.resolve(__dirname, '../../../public/index.html'));
  });

  const port = process.env.PORT ?? 3000;
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`HTTP server is listening on port ${port}`);
  });
}

function bootStrap() {
  console.log('bootStrap');
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`PORT: ${process.env.PORT}`);
  if (process.env.NODE_ENV !== 'production') {
    startExpressServer();
    return;
  }
  if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);
    const numCPUs = os.availableParallelism();
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on('exit', (worker /* , code, signal */) =>
      console.log(`worker ${worker.process.pid} died`),
    );
    return;
  }
  console.log(`Worker ${process.pid} started`);
  startExpressServer();
  return;
}

bootStrap();
