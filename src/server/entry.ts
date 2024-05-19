import path from 'node:path';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(express.static(path.resolve(__dirname, '../../../public')));
app.use(bodyParser.json());

// interface ResponseBody {
//   [key: string]: string;
// }

// Testing 1,2,3
app.post('/api/echo', (req, res) => {
  const body = req.body as unknown;
  res.json({ body });
});

app.get('/api/echo', (req, res) => {
  res.json({ foo: 'bar' });
});

// Catch all, serve html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../../public/index.html'));
});

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`HTTP server is listening on port ${port}`);
});
