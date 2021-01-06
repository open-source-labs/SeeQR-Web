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
var Pool = require('pg').Pool;
var _a = require('./foreign_key_info'), getPrimaryKeys = _a.getPrimaryKeys, getForeignKeys = _a.getForeignKeys;
// Initialize to a default db.
// URI Format: postgres://username:password@hostname:port/databasename
var PG_URI = '';
// 'postgres://imnltipq:krVtiwnzjyQbVlfUNX9Z4J6MjB7AECm8@suleiman.db.elephantsql.com:5432/imnltipq';
var pool = new Pool({ connectionString: PG_URI });
// async function executeQuery(id: number) {
//   const options = {
//     method: 'PUT',
//     headers: { 
//       'Authorization': 'Basic Ojg4MDVmN2U2LTBiZWUtNDcwNC04OWRlLTU5YmM2ZTJlNWEyYw==',
//     }
//   }
//   const response = await fetch(`https://customer.elephantsql.com/api/instances/${id}`, options);
//   const data = await response.json();
//   const { id } = data;
//   setTimeout(() => deleteDB(id), 600000); //10 minutes
//   next();
// }
//helper function that creates the column objects, which are saved to the schemaLayout object
//this function returns a promise to be resolved with Promise.all syntax
var getColumnObjects = function (tableName) {
    var queryString = 'SELECT column_name, data_type, character_maximum_length FROM information_schema.columns WHERE table_name = $1;';
    return new Promise(function (resolve) {
        pool.query(queryString, [tableName]).then(function (result) {
            var columnInfoArray = [];
            for (var i = 0; i < result.rows.length; i++) {
                var columnObj = {
                    columnName: result.rows[i].column_name,
                    dataInfo: {
                        data_type: result.rows[i].data_type,
                        character_maximum_length: result.rows[i].character_maximum_length,
                    },
                };
                columnInfoArray.push(columnObj);
            }
            resolve(columnInfoArray);
        });
    });
};
// gets all the names of the current postgres instances
var getDBNames = function () {
    return new Promise(function (resolve) {
        pool.query('SELECT datname FROM pg_database;').then(function (databases) {
            var dbList = [];
            for (var i = 0; i < databases.rows.length; ++i) {
                var curName = databases.rows[i].datname;
                if (curName !== 'postgres' &&
                    curName !== 'template0' &&
                    curName !== 'template1')
                    dbList.push(databases.rows[i].datname);
            }
            resolve(dbList);
        });
    });
};
// gets all tablenames from currentschema
var getDBLists = function () {
    return new Promise(function (resolve) {
        pool
            .query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;")
            .then(function (tables) {
            var tableList = [];
            for (var i = 0; i < tables.rows.length; ++i) {
                tableList.push(tables.rows[i].table_name);
            }
            resolve(tableList);
        });
    });
};
module.exports = {
    query: function (text, params, callback) {
        console.log('Executed query: ', text);
        return pool.query(text, params, callback);
    },
    changeDB: function (dbName) {
        PG_URI = 'postgres://postgres:postgres@localhost:5432/' + dbName;
        pool = new Pool({ connectionString: PG_URI });
        console.log('Current URI: ', PG_URI);
        return dbName;
    },
    getLists: function () {
        return new Promise(function (resolve) {
            var listObj = {
                tableList: [],
                databaseList: [],
            };
            Promise.all([getDBNames(), getDBLists()]).then(function (data) {
                console.log('models: ', data);
                listObj.databaseList = data[0];
                listObj.tableList = data[1];
                resolve(listObj);
            });
        });
    },
    createKeyObject: function () {
        return new Promise(function (resolve) {
            // initialize the keyObject we eventually want to return out
            var keyObject = {};
            pool
                .query(getPrimaryKeys, null)
                .then(function (result) {
                var table;
                var pkColumn;
                // iterate over the primary key table, adding info to our keyObject
                for (var i = 0; i < result.rows.length; i++) {
                    table = result.rows[i].table_name;
                    pkColumn = result.rows[i].pk_column;
                    // if the table is not yet initialized within the keyObject, then initialize it
                    if (!keyObject[table])
                        keyObject[table] = {
                            primaryKeyColumns: {},
                            foreignKeyColumns: {},
                        };
                    // then just set the value at the pk column name to true for later checking
                    keyObject[table].primaryKeyColumns[pkColumn] = true;
                }
            })
                .then(function () {
                pool.query(getForeignKeys, null).then(function (result) {
                    var table;
                    var primaryTable;
                    var fkColumn;
                    // iterate over the foreign key table, adding info to our keyObject
                    for (var i = 0; i < result.rows.length; i++) {
                        table = result.rows[i].foreign_table;
                        primaryTable = result.rows[i].primary_table;
                        fkColumn = result.rows[i].fk_column;
                        // if the table is not yet initialized within the keyObject, then initialize it
                        if (!keyObject[table])
                            keyObject[table] = {
                                primaryKeyColumns: {},
                                foreignKeyColumns: {},
                            };
                        // then set the value at the fk column name to the number of rows asked for in the primary table to which it points
                        keyObject[table].foreignKeyColumns[fkColumn] = primaryTable;
                    }
                    resolve(keyObject);
                });
            });
        });
    },
    dropKeyColumns: function (keyObject) { return __awaiter(void 0, void 0, void 0, function () {
        var generateAndRunDropQuery, _a, _b, _i, table;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    generateAndRunDropQuery = function (table) {
                        var queryString = "ALTER TABLE " + table;
                        var count = 2;
                        for (var pkc in keyObject[table].primaryKeyColumns) {
                            if (count > 2)
                                queryString += ',';
                            queryString += " DROP COLUMN " + pkc + " CASCADE";
                            count += 1;
                        }
                        for (var fkc in keyObject[table].foreignKeyColumns) {
                            if (count > 2)
                                queryString += ',';
                            queryString += " DROP COLUMN " + fkc;
                            count += 1;
                        }
                        queryString += ';';
                        return Promise.resolve(pool.query(queryString));
                    };
                    _a = [];
                    for (_b in keyObject)
                        _a.push(_b);
                    _i = 0;
                    _c.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    table = _a[_i];
                    return [4 /*yield*/, generateAndRunDropQuery(table)];
                case 2:
                    _c.sent();
                    _c.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    addNewKeyColumns: function (keyObject) { return __awaiter(void 0, void 0, void 0, function () {
        var generateAndRunAddQuery, _a, _b, _i, table;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    generateAndRunAddQuery = function (table) {
                        var queryString = "ALTER TABLE " + table;
                        var count = 2;
                        for (var pkc in keyObject[table].primaryKeyColumns) {
                            if (count > 2)
                                queryString += ',';
                            queryString += " ADD COLUMN " + pkc + " INT";
                            count += 1;
                        }
                        for (var fkc in keyObject[table].foreignKeyColumns) {
                            if (count > 2)
                                queryString += ',';
                            queryString += " ADD COLUMN " + fkc + " INT";
                            count += 1;
                        }
                        queryString += ';';
                        return Promise.resolve(pool.query(queryString));
                    };
                    _a = [];
                    for (_b in keyObject)
                        _a.push(_b);
                    _i = 0;
                    _c.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    table = _a[_i];
                    return [4 /*yield*/, generateAndRunAddQuery(table)];
                case 2:
                    _c.sent();
                    _c.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    getSchemaLayout: function () {
        // initialize a new promise; we resolve this promise at the end of the last async function within the promise
        return new Promise(function (resolve) {
            var schemaLayout = {
                tableNames: [],
                tables: {
                // tableName: [columnObj array]
                },
            };
            pool
                // This query returns the names of all the tables in the database
                .query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;")
                // then we save the table names into the schemaLayout object in the tableNames property
                .then(function (tables) {
                for (var i = 0; i < tables.rows.length; ++i) {
                    schemaLayout.tableNames.push(tables.rows[i].table_name);
                }
                var promiseArray = [];
                for (var _i = 0, _a = schemaLayout.tableNames; _i < _a.length; _i++) {
                    var tableName = _a[_i];
                    promiseArray.push(getColumnObjects(tableName));
                }
                //we resolve all of the promises for the data info, and are returned an array of column data objects
                Promise.all(promiseArray).then(function (columnInfo) {
                    //here, we create a key for each table name and assign the array of column objects to the corresponding table name
                    for (var i = 0; i < columnInfo.length; i++) {
                        schemaLayout.tables[schemaLayout.tableNames[i]] = columnInfo[i];
                    }
                    resolve(schemaLayout);
                });
            })
                .catch(function () {
                console.log('error in models.ts');
            });
        });
    },
    addPrimaryKeyConstraints: function (keyObject, dummyDataRequest) { return __awaiter(void 0, void 0, void 0, function () {
        var _i, _a, tableName, queryString, count, pk;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _i = 0, _a = Object.keys(dummyDataRequest.dummyData);
                    _b.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    tableName = _a[_i];
                    if (!keyObject[tableName]) return [3 /*break*/, 3];
                    if (!Object.keys(keyObject[tableName].primaryKeyColumns).length) return [3 /*break*/, 3];
                    queryString = "ALTER TABLE " + tableName + " ";
                    count = 0;
                    for (pk in keyObject[tableName].primaryKeyColumns) {
                        if (count > 0)
                            queryString += ", ";
                        queryString += "ADD CONSTRAINT \"" + tableName + "_pk" + count + "\" PRIMARY KEY (\"" + pk + "\")";
                        count += 1;
                    }
                    queryString += ";";
                    // wait for the previous query to return before moving on to the next table
                    return [4 /*yield*/, pool.query(queryString)];
                case 2:
                    // wait for the previous query to return before moving on to the next table
                    _b.sent();
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    addForeignKeyConstraints: function (keyObject, dummyDataRequest) { return __awaiter(void 0, void 0, void 0, function () {
        var _i, _a, tableName, queryString, count, fk, primaryTable, primaryKey;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _i = 0, _a = Object.keys(dummyDataRequest.dummyData);
                    _b.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    tableName = _a[_i];
                    if (!keyObject[tableName]) return [3 /*break*/, 3];
                    if (!Object.keys(keyObject[tableName].foreignKeyColumns).length) return [3 /*break*/, 3];
                    queryString = "ALTER TABLE " + tableName + " ";
                    count = 0;
                    for (fk in keyObject[tableName].foreignKeyColumns) {
                        primaryTable = keyObject[tableName].foreignKeyColumns[fk];
                        primaryKey = Object.keys(keyObject[primaryTable].primaryKeyColumns)[0];
                        if (count > 0)
                            queryString += ", ";
                        queryString += "ADD CONSTRAINT \"" + tableName + "_fk" + count + "\" FOREIGN KEY (\"" + fk + "\") REFERENCES " + primaryTable + "(\"" + primaryKey + "\")";
                        count += 1;
                    }
                    queryString += ";";
                    // wait for the previous query to return before moving on to the next table
                    return [4 /*yield*/, pool.query(queryString)];
                case 2:
                    // wait for the previous query to return before moving on to the next table
                    _b.sent();
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    }); },
};
//# sourceMappingURL=models.js.map