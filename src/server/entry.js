// import path from 'node:path';
// import express from 'express';
// import bodyParser from 'body-parser';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const { handleAsyncError } = require('./helpers.js');

const app = express();

app.use(express.static(path.resolve(__dirname, '../../../public')));
app.use(bodyParser.json());

// Testing 1,2,3
app.post(
  '/api/echo',
  handleAsyncError(async (req, res) => {
    res.json({
      body: req.body,
    });
  }),
);

app.get(
  '/api/echo',
  handleAsyncError(async (req, res) => {
    res.json({ foo: 'bar6' });
  }),
);

// Catch all, serve html
app.get(
  '*',
  handleAsyncError(async (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../public/index.html'));
    // res.json({ body: req.body });
  }),
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`HTTP server is listening on port ${port}`);
});
