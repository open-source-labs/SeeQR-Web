"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var queryRouter_1 = __importDefault(require("./routes/queryRouter"));
var express = require('express');
var path = require('path');
// const fetch = require('node-fetch');
var cookieParser = require('cookie-parser');
var dbController_1 = __importDefault(require("./controllers/dbController"));
var server = express();
//Parsing Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.get('/', dbController_1.default.makeDB, function (req, res) {
    return res.sendFile(path.join(__dirname, '../../dist/index.html'));
});
server.use(express.static('dist'));
server.use('/query', queryRouter_1.default);
// default error handler
server.use(function (err, req, res, next) {
    var defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 400,
        message: { err: 'An error occurred' },
    };
    var errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});
server.listen(process.env.PORT || 3000, function () { return console.log('listening on port 3000'); });
exports.default = server;
//# sourceMappingURL=server.js.map