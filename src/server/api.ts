import { Request, Response, Express } from 'express';

function api(app: Express) {
  // Test APIs
  app.get('/api/echo', (req: Request, res: Response) => {
    console.log(`get /api/echo: Worker ${process.pid}`);
    res.json({ foo: 'bar' });
  });
  app.post('/api/echo', (req: Request, res: Response) => {
    console.log(`post /api/echo: Worker ${process.pid}`);
    const body = req.body as unknown;
    res.json({ body });
  });
  // CRUD DynamoDB Records
  // File upload to S3
}

export default api;
