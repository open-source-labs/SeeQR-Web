import queryRouter from '../tsCompiled/backend/routes/queryRouter';

const express = require('express');
const path = require('path');
// const fetch = require('node-fetch');
const cookieParser = require('cookie-parser');

import dbController from './controllers/dbController';

const server = express();

//Parsing Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

server.get('/', dbController.makeDB, (req, res) => {
  return res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

server.use(express.static('dist'));

server.use('/query', queryRouter);

// default error handler
server.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

server.listen(process.env.PORT || 3000, () => console.log('listening on port 3000'));

export default server;
