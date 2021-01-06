"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
// const schemaController = require('../controllers/schemaController');
var schemaController_1 = __importDefault(require("../controllers/schemaController"));
router.get('/skip-file-upload', schemaController_1.default.skipFileUpload, function (req, res) {
    res.status(200).json('skipped file upload');
});
router.post('/upload-file', schemaController_1.default.fileUpload, function (req, res) {
    res.status(200).json(res.locals);
});
router.post('/input-schema', schemaController_1.default.inputSchema, function (req, res) {
    res.status(200).json(res.locals);
});
//this needs to be module.exports or it will crash
module.exports = router;
//# sourceMappingURL=schemaRouter.js.map