const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'server.log'), {
  flags: 'a',
});

morgan.token('body', (req, res) => JSON.stringify(req.body));
morgan.token('header', (req, res) => JSON.stringify(req.headers));

app.use(express.json());

// setup the logger
app.use(
  morgan('[:date[clf]] :status :method :url :body :header', {
    stream: accessLogStream,
  })
);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/', (req, res) => {
  res.status(201).send('Log created');
});

app.listen(3000, () => {
  console.log('App listening on port 3000 ...');
});
