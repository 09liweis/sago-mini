const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const app = express();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/db', { useNewUrlParser: true });

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'dist')));

const api = require('./server/routes/api');
app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = 3000 || process.env.PORT;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));
