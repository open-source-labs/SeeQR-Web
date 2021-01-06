"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var db = require('../models');
var exec = require('child_process').exec;
/************************************************************
 *********************** Helper functions *******************
 ************************************************************/
// Generate CLI commands to be executed in child process.
var createDBFunc = function (name) {
    return "psql -U postgres -c \"CREATE DATABASE " + name + "\"";
    //return `docker exec postgres-1 psql -h localhost -p 5432 -U postgres -c "CREATE DATABASE ${name}"`;
};
var runSQLFunc = function (dbName, file) {
    return "psql -U postgres -d " + dbName + " -f " + file; // replaced /data_dump with ${file};
};
var runTARFunc = function (dbName, file) {
    return "pg_restore -U postgres -d " + dbName + " -f " + file; // replaced /data_dump with ${file}`;
};
var runFullCopyFunc = function (dbCopyName, file) {
    var newFile = file[0];
    return "pg_dump -U postgres -d " + dbCopyName + " -f " + newFile;
};
var runHollowCopyFunc = function (dbCopyName, file) {
    return "pg_dump -s -U postgres " + dbCopyName + " -f " + file; // replaced /data_dump with ${file}`;
};
// Function to execute commands in the child process.
var execute = function (str, nextStep, errorStep) {
    exec(str, function (error, stdout, stderr) {
        if (error) {
            //this shows the console error in an error message on the frontend
            alert(error.message);
            console.log("error: " + error.message);
            errorStep();
            return;
        }
        if (stderr) {
            //this shows the console error in an error message on the frontend
            alert(stderr);
            return;
        }
        if (nextStep)
            nextStep();
    });
};
// const schemaController: any = {};
// console.log(schemaController);
// schemaController.skipFileUpload = (req, res, next) => {
//   next();
// };
var schemaController = {
    skipFileUpload: function (req, res, next) {
        console.log('inside skip file upload');
        next();
    },
    fileUpload: function (req, res, next) {
        var formData = req.body.formData;
        // event.sender.send('async-started');
        console.log('this is formData: ', formData);
        var dbName;
        // if (process.platform === 'darwin') {
        //   dbName = filePath[0].slice(
        //     filePath[0].lastIndexOf('/') + 1,
        //     filePath[0].lastIndexOf('.')
        //   );
        // } else {
        //   dbName = filePath[0].slice(
        //     filePath[0].lastIndexOf('\\') + 1,
        //     filePath[0].lastIndexOf('.')
        //   );
        // }
        // const createDB: string = createDBFunc(dbName);
        // const runSQL: string = runSQLFunc(dbName, filePath);
        // const runTAR: string = runTARFunc(dbName, filePath);
        // const extension: string = filePath[0].slice(filePath[0].lastIndexOf('.'));
        // let dbSize: string;
        // SEQUENCE OF EXECUTING COMMANDS
        // Steps are in reverse order because each step is a callback function that requires the following step to be defined.
        // Step 5: Changes the pg URI the newly created database, queries new database, then sends list of tables and list of databases to frontend.
        function sendLists() {
            return __awaiter(this, void 0, void 0, function () {
                var listObj;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, db.getLists()];
                        case 1:
                            listObj = _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
        // Step 4: Given the file path extension, run the appropriate command in postgres to populate db.
        // const step4 = () => {
        //   let runCmd: string = '';
        //   if (extension === '.sql') runCmd = runSQL;
        //   else if (extension === '.tar') runCmd = runTAR;
        //   execute(runCmd, sendLists, () => {
        //     // event.sender.send('async-complete')
        //     console.log('async-complete');
        //   });
        //   // DB query to get the database size
        //   db.query(`SELECT pg_size_pretty(pg_database_size('${dbName}'));`).then(
        //     (queryStats) => {
        //       dbSize = queryStats.rows[0].pg_size_pretty;
        //     }
        //   );
        // };
        // // Step 3: Import database file from file path into docker container
        // // Edit: We changed the functionality to create a file on the local machine instead of adding it to the docker container
        // // const step3 = () => execute(importFile, step4);
        // // Step 2: Change current URI to match newly created DB
        // const step2 = () => {
        //   db.changeDB(dbName);
        //   return step4(); //changing step3 to step4 to test removal of importFile func
        // };
        // // Step 1: Create empty db
        // if (extension === '.sql' || extension === '.tar')
        //   execute(createDB, step2, () =>
        //     /*event.sender.send('async-complete')*/ console.log('async-complete')
        //   );
        // else console.log('INVALID FILE TYPE: Please use .tar or .sql extensions.');
        next();
    },
    inputSchema: function (req, res, next) {
        // event.sender.send('async-started');
        var data = req.body.data;
        var _a = req.body, dbName = _a.schemaName, dbCopyName = _a.dbCopyName, copy = _a.copy;
        var filePath = req.body.schemaFilePath;
        filePath = [data.schemaName + '.sql'];
        // generate strings that are fed into execute functions later
        var createDB = createDBFunc(dbName);
        var runSQL = runSQLFunc(dbName, filePath);
        var runTAR = runTARFunc(dbName, filePath);
        var runFullCopy = runFullCopyFunc(dbCopyName, filePath);
        var runHollowCopy = runHollowCopyFunc(dbCopyName, filePath);
        // determine if the file is a sql or a tar file, in the case of a copy, we will not have a filepath so we just hard-code the extension to be sql
        var extension = '';
        if (filePath.length > 0) {
            extension = filePath[0].slice(filePath[0].lastIndexOf('.'));
        }
        else
            extension = '.sql';
        // SEQUENCE OF EXECUTING COMMANDS
        // Steps are in reverse order because each step is a callback function that requires the following step to be defined.
        // Step 5: Changes the pg URI to look to the newly created database and queries all the tables in that database and sends it to frontend.
        function sendLists() {
            return __awaiter(this, void 0, void 0, function () {
                var listObj;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, db.getLists()];
                        case 1:
                            listObj = _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
        // Step 4: Given the file path extension, run the appropriate command in postgres to build the db
        var step4 = function () {
            var runCmd = '';
            if (extension === '.sql')
                runCmd = runSQL;
            else if (extension === '.tar')
                runCmd = runTAR;
            execute(runCmd, sendLists, function () {
                /*event.sender.send('async-complete')*/ return console.log('async-complete');
            });
        };
        // Step 3: Import database file from file path into docker container
        //const step3 = () => execute(importFile, step4);
        // skip step three which is only for importing files and instead change the current db to the newly created one
        var step3Copy = function () {
            db.changeDB(dbName);
            return step4();
        };
        // Step 2: Change current URI to match newly created DB
        var step2 = function () {
            // if we are copying
            if (copy !== undefined) {
                // first, we need to change the current DB instance to that of the one we need to copy, so we'll head to the changeDB function in the models file
                db.changeDB(dbCopyName);
                // now that our DB has been changed to the one we wish to copy, we need to either make an exact copy or a hollow copy using pg_dump OR pg_dump -s
                // this generates a pg_dump file from the specified db and saves it to a location in the container.
                // Full copy case
                if (copy) {
                    execute(runFullCopy, step3Copy, function () {
                        console.log('async-complete');
                        // event.sender.send('async-complete')
                    });
                }
                // Hollow copy case
                else
                    execute(runHollowCopy, step3Copy, function () {
                        console.log('async-complete');
                        // event.sender.send('async-complete')
                    });
                return;
            }
            // if we are not copying
            else {
                // change the current database back to the newly created one
                // and now that we have changed to the new db, we can move on to importing the data file
                db.changeDB(dbName);
                return step4(); //changing step3 to step4 to test removal of importFile func
            }
        };
        // Step 1 : Create empty db
        execute(createDB, step2, function () {
            // event.sender.send('async-complete')
            console.log('async-complete');
        });
        next();
    },
};
exports.default = schemaController;
//# sourceMappingURL=schemaController.js.map