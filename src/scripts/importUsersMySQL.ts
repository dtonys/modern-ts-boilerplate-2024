import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '../../.env' });

// import csv from 'csv-parser';
import mysql from 'mysql2/promise';

const mySQLConfig = {
  host: process.env.MYSQL_ENDPOINT,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

// MySQL connection config
const auroraConfig = {
  host: process.env.AURORA_ENDPOINT,
  user: process.env.AURORA_USERNAME,
  password: process.env.AURORA_PASSWORD,
  database: process.env.AURORA_DATABASE,
};

async function importCSVToMySQL(filePath: string) {
  const connection: mysql.Connection = await mysql.createConnection({
    ...auroraConfig,
    infileStreamFactory: (path: string) => fs.createReadStream(path),
  });
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS Users (
      id VARCHAR(5) NOT NULL PRIMARY KEY,
      Name VARCHAR(100),
      City VARCHAR(100),
      Gender ENUM('Male', 'Female', 'Other'),
      Country VARCHAR(100),
      DOB DATE,
      Interests TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  // const stream = fs.createReadStream(filePath).pipe(csv());

  const _filePath = path.resolve(__dirname, filePath);
  console.log('_filePath');
  console.log(_filePath);

  // // Read each row in the CSV
  // const users = [];
  // for await (const row of stream) {
  //   row.id = row.UserID;
  //   delete row.UserID;
  //   users.push(row);
  // }
  console.log(`Loading ${_filePath}`);
  const response = await connection.query(
    `
      LOAD DATA LOCAL INFILE ?
      INTO TABLE Users
      FIELDS TERMINATED BY ','
      ENCLOSED BY '"'
      LINES TERMINATED BY '\n'
      IGNORE 1 ROWS
      (id, Name, Gender, DOB, Interests, City, Country);
    `,
    [_filePath],
  );
  console.log(response);
  console.log(`Done****`);
}
// Run the import script
importCSVToMySQL('../data/SocialMediaUsersDataset.csv').catch(console.error);
