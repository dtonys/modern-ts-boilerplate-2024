import { Request, Response, Router } from 'express';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument, paginateScan } from '@aws-sdk/lib-dynamodb';
import { handleAsyncError } from '../helpers';

class UserController {
  static DynamoClient: DynamoDBDocument;

  static init(): Router {
    // setup DB
    this.DynamoClient = DynamoDBDocument.from(new DynamoDB({ region: 'us-east-1' }));
    // setup router and attach routes
    const router = Router();
    router.get('/api/users', this.getUserList);
    router.get('/api/users/:id', this.getUserById);

    // return router
    return router;
  }

  static getUserList = handleAsyncError(async (req: Request, res: Response) => {
    const paginatedScan = paginateScan({ client: this.DynamoClient }, { TableName: 'users' });
    const users = [];
    let pageCount = 0;
    for await (const page of paginatedScan) {
      console.log(`page ${pageCount}`);
      pageCount++;
      users.push(...(page.Items ?? []));
    }
    res.send(users);
  });

  static getUserById = handleAsyncError(async (req: Request, res: Response) => {
    const response = await this.DynamoClient.get({
      TableName: 'users',
      Key: { id: req.params.id },
    });
    res.json(response.Item);
  });
}

export default UserController;
