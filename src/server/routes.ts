import { Express } from 'express';
import mysql from 'mysql2/promise';
import { createClient, RedisClientType } from 'redis';
import AuthController from './controllers/auth';
import UserController from './controllers/users';

// MySQL connection config
const dbConfig = {
  host: process.env.MYSQL_ENDPOINT, // RDS endpoint or local MySQL server
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

const auroraConfig = {
  host: process.env.AURORA_ENDPOINT, // RDS endpoint or local MySQL server
  user: process.env.AURORA_USERNAME,
  password: process.env.AURORA_PASSWORD,
  database: process.env.AURORA_DATABASE,
};

const redisConfig = {
  url: process.env.REDIS_ENDPOINT,
  socket: {
    tls: false,
  },
};

export default async function routes(app: Express) {
  const SQLClient: mysql.Connection = await mysql.createConnection(dbConfig);
  const AuroraClient: mysql.Connection = await mysql.createConnection(auroraConfig);
  const RedisClient: RedisClientType = createClient(redisConfig);
  await RedisClient.connect();

  app.use(AuthController.getRoutes());
  app.use(UserController.init(SQLClient, AuroraClient, RedisClient));
}
