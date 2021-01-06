"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var queryController_1 = __importDefault(require("./queryController"));
router.get('/execute-query-untracked', queryController_1.default.executeQueryUntracked, function (req, res) {
    res.status(200).json(res.locals);
});
router.put('/execute-query-tracked', queryController_1.default.executeQueryTracked, function (req, res) {
    res.status(200).json(res.locals);
});
router.get('/generate-dummy-data', queryController_1.default.generateDummyData, function (req, res) {
    res.status(200).json(res.locals);
});
exports.default = router;
//# sourceMappingURL=queryRouter.js.map