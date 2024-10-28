import fs from 'fs';
// import path from 'path';
import { createClient, RedisClientType } from 'redis';
import csv from 'csv-parser';

async function importCSVToRedis(filePath: string) {
  const client: RedisClientType = createClient({
    url: `redis://localhost:6379`,
    socket: {
      tls: false,
      // ca: [fs.readFileSync(path.resolve(__dirname, '../../AmazonRootCA1.pem'))],
      // rejectUnauthorized: false,
    },
  });
  client.on('error', (err) => console.error('Redis Client Error', err));
  await client.connect();

  // Create a readable stream from the CSV file
  const stream = fs.createReadStream(filePath).pipe(csv());
  const batchSize = 2000;
  let count = 0;
  const pipeline = client.multi(); // Initialize pipeline for batching
  let i = 0;
  for await (const row of stream) {
    if (i % 1000 === 0) {
      console.log('row', row);
    }
    i++;
    console.log('users', row.UserID, JSON.stringify(row));
    pipeline.hSet('users', row.UserID, JSON.stringify(row));
    count++;
    if (count === batchSize) {
      console.log('pipeline.exec');
      console.log(i);
      await pipeline.exec();
      count = 0;
    }
  }
  console.log('DONE');
  await client.disconnect();
}

importCSVToRedis('../data/SocialMediaUsersDataset.csv').catch(console.error);
