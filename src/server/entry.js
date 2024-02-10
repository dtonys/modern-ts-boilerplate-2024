const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const { handleAsyncError } = require('./helpers.js');

const app = express();

app.use(express.static(path.join(__dirname, '../../dist')));
app.use(bodyParser.json());

app.post('/api/echo', handleAsyncError(async (req, res) => {
  res.json({ body: req.body });
}));

// Catch all, serve html
app.get('*', handleAsyncError(async (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
  // res.json({ body: req.body });
}));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`HTTP server is listening on port ${port}`);
});
