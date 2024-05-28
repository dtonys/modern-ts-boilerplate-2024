import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { Request, Response, Router, RequestHandler } from 'express';

import { handleAsyncError } from '../helpers';

interface HandlerMap {
  [key: string]: RequestHandler;
}

const getRoutes = (handlers: HandlerMap) => {
  const router = Router();
  router.get('/api/echo', handlers.getEcho!);
  router.post('/api/echo', handlers.postEcho!);
  router.get('/api/items', handlers.listItems!);
  return router;
};

const getHandlers = () => {
  const dynamoClient = new DynamoDBClient({
    region: 'us-west-1',
  });
  const docClient = DynamoDBDocumentClient.from(dynamoClient);

  const handlers = {
    getEcho: (req: Request, res: Response) => {
      console.log(`get /api/echo: Worker ${process.pid}`);
      res.json({ foo: 'bar' });
    },
    postEcho: (req: Request, res: Response) => {
      console.log(`post /api/echo: Worker ${process.pid}`);
      const body = req.body as unknown;
      res.json({ body });
    },
    listItems: handleAsyncError(async (req: Request, res: Response) => {
      const response = await docClient.send(
        new ScanCommand({
          TableName: 'test-table',
        }),
      );
      res.json(response.Items);
    }),
  };
  return handlers;
};

const testController = (): Router => {
  const handlers = getHandlers();
  const router = getRoutes(handlers);
  return router;
};

export default testController;
