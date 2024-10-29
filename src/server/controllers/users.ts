import { Request, Response, Router } from 'express';
import { RedisClientType } from 'redis';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument, paginateScan } from '@aws-sdk/lib-dynamodb';
import mysql, { RowDataPacket } from 'mysql2/promise';
import { handleAsyncError, ErrorWithStatus } from '../helpers';

class StaticUserController {
  static DynamoClient: DynamoDBDocument;
  static tableName = 'users';
  static SQLClient: mysql.Connection;
  static AuroraClient: mysql.Connection;
  static RedisClient: RedisClientType;

  static init(
    SQLClient: mysql.Connection,
    AuroraClient: mysql.Connection,
    RedisClient: RedisClientType,
  ): Router {
    // setup DB
    this.DynamoClient = DynamoDBDocument.from(new DynamoDB({ region: 'us-east-1' }));
    this.SQLClient = SQLClient;
    this.AuroraClient = AuroraClient;
    this.RedisClient = RedisClient;

    // setup router and attach routes
    const router = Router();
    router.get('/api/dynamo/users', handleAsyncError(this.getUserListDynamo));
    router.get('/api/dynamo/users/:id', handleAsyncError(this.getUserByIdDynamo));

    router.get('/api/sql/users', handleAsyncError(this.getUserListSQL));
    router.get('/api/sql/users/:id', handleAsyncError(this.getUserByIdSQL));

    router.get('/api/redis/users', handleAsyncError(this.getUserListRedis));
    router.get('/api/redis/users/:id', handleAsyncError(this.getUserByIdRedis));
    return router;
  }

  static scanDynamoSegment = async (segment: number, totalSegments: number, req: Request) => {
    const paginator = paginateScan(
      { client: this.DynamoClient },
      {
        TableName: this.tableName,
        Segment: segment,
        TotalSegments: totalSegments,
        ...(req.query.q
          ? {
              FilterExpression: 'contains(#name, :substring)',
              ExpressionAttributeNames: {
                '#name': 'Name',
              },
              ExpressionAttributeValues: {
                ':substring': req.query.q,
              },
            }
          : {}),
      },
    );
    const items = [];
    let pageCount = 0;
    for await (const page of paginator) {
      // console.log(`page ${segment}--${pageCount}`);
      pageCount++;
      items.push(...(page.Items ?? []));
    }
    return items;
  };

  static getUserListDynamo = async (req: Request, res: Response) => {
    const startTime = Date.now();
    const { parallel } = req.query;

    if (parallel) {
      const totalSegments = 10; // 1 segment/MB seems to be point of diminishing returns
      const segmentPromises = [];
      for (let segment = 0; segment < totalSegments; segment++) {
        segmentPromises.push(this.scanDynamoSegment(segment, totalSegments, req));
      }
      const results = await Promise.all(segmentPromises);
      const allItems = results.flat(); // Flatten the array of arrays
      const endTime = Date.now();
      console.log('DynamoDB Parallel');
      console.log('Duration in seconds');
      console.log(((endTime - startTime) / 1000).toFixed(2));
      res.send(allItems);
      return;
    }
    const paginatedScan = paginateScan(
      { client: this.DynamoClient },
      {
        TableName: this.tableName,
        ...(req.query.q
          ? {
              FilterExpression: 'contains(#name, :substring)',
              ExpressionAttributeNames: {
                '#name': 'Name',
              },
              ExpressionAttributeValues: {
                ':substring': req.query.q,
              },
            }
          : {}),
      },
    );
    const users = [];
    let pageCount = 0;
    for await (const page of paginatedScan) {
      pageCount++;
      users.push(...(page.Items ?? []));
    }
    const endTime = Date.now();
    console.log('DynamoDB');
    console.log('Duration in seconds');
    console.log(((endTime - startTime) / 1000).toFixed(2));
    res.send(users);
  };

  static getUserByIdDynamo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await this.DynamoClient.get({
      TableName: this.tableName,
      Key: { id },
    });
    res.json(response.Item);
  };

  static getUserListSQL = async (req: Request, res: Response) => {
    const startTime = Date.now();
    let targetClient = this.SQLClient;
    if (req.query.aurora) {
      targetClient = this.AuroraClient;
    }
    let query = `SELECT * FROM Users`;
    if (req.query.q) {
      query += ` WHERE Name LIKE '%${req.query.q}%' OR City LIKE '%${req.query.q}%'`;
    }
    const [users] = await targetClient.execute<RowDataPacket[]>(query);
    const endTime = Date.now();
    console.log(req.query.aurora ? 'Aurora' : 'MySQL');
    console.log('Duration in seconds');
    console.log(((endTime - startTime) / 1000).toFixed(2));
    res.json(users);
  };

  static getUserByIdSQL = async (req: Request, res: Response) => {
    const { id } = req.params;
    let targetClient = this.SQLClient;
    if (req.query.aurora) {
      targetClient = this.AuroraClient;
    }
    const [users] = await targetClient.query<RowDataPacket[]>(`SELECT * FROM Users WHERE id = ?`, [
      id,
    ]);
    if (!users.length) {
      throw new ErrorWithStatus(`User ${id} not found.`, 404);
    }
    console.log(users);
    res.json(users[0]);
  };

  static getUserListRedis = async (req: Request, res: Response) => {
    const startTime = Date.now();
    const usersMap = await this.RedisClient.hGetAll('users');
    const endTime = Date.now();
    console.log('Redis');
    console.log('Duration in seconds');
    console.log(((endTime - startTime) / 1000).toFixed(2));
    res.json(usersMap);
    // res.json(map);
  };

  static getUserByIdRedis = async (req: Request, res: Response) => {
    const data = await this.RedisClient.hGet('users', req.params.id!);
    if (!data) {
      throw new ErrorWithStatus(`User ${req.params.id} not found.`, 404);
    }
    res.json(JSON.parse(data));
  };
}

export default StaticUserController;
