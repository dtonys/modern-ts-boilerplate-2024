import _ from 'lodash';
import fs from 'fs';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import csv from 'csv-parser';

const docClient = DynamoDBDocument.from(
  new DynamoDB({
    region: 'us-east-1',
    maxAttempts: 10,
  }),
);

async function importCSVToDynamoDB(filePath: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let itemsBatch: any[] = [];
  let recordsProcessed = 0;

  // Create a readable stream from the CSV file
  const stream = fs.createReadStream(filePath).pipe(csv());

  // Read each row in the CSV
  const users = [];
  for await (const row of stream) {
    row.id = row.UserID;
    delete row.UserID;
    users.push(row);
  }
  // Write it 25 items at a time
  const chunkedUsers = _.chunk(users, 25);
  for (const userChunk of chunkedUsers) {
    console.log('writing user chunk');
    console.log(JSON.stringify(userChunk));
    const requests = userChunk.map((user) => ({ PutRequest: { Item: user } }));
    await docClient.batchWrite({ RequestItems: { users: requests } });
  }
}

// Run the import script
const filePath = './your-file.csv'; // Path to your CSV file
importCSVToDynamoDB('../data/SocialMediaUsersDataset.csv').catch(console.error);
