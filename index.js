const express = require('express');
const http = require('http');
const bodyParse = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

//DB Setup
mongoose.connect('mongodb://localhost/Auth');

  var db = mongoose.connection; //instance of mongo

  db.on('error',function () {
    console.log('Error connecting to database');
  });
  db.on('open',function () {
    console.log('connection established');
  });


//App Setup
app.use(morgan('combined'));
app.use(bodyParse.json());
router(app);


// Server Setup
const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port);
console.log('Server listening on port: ',port);