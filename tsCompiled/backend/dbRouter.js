"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var dbController = require('./dbController');
router.get('return-db-list', dbController.returnDbList, function (req, res) {
    res.status(200).json(res.locals);
});
router.get('change-db', dbController.changeDb, function (req, res) {
    res.status(200).json(res.locals);
});
exports.default = router;
//# sourceMappingURL=dbRouter.js.map