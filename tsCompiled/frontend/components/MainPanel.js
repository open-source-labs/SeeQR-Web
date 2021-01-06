"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var Compare_1 = require("./leftPanel/Compare");
var History_1 = __importDefault(require("./leftPanel/History"));
var Tabs_1 = require("./rightPanel/Tabs");
var MainPanel = /** @class */ (function (_super) {
    __extends(MainPanel, _super);
    function MainPanel(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            queries: [],
            // currentSchema will change depending on which Schema Tab user selects
            loading: false,
            dbSize: '',
        };
        _this.submitQuery = function (event, query) { return __awaiter(_this, void 0, void 0, function () {
            var response, returnedData, queryData, queryStats, queryLabel, newQuery, queries;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.preventDefault();
                        return [4 /*yield*/, fetch('/query/execute-query-tracked', {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ query: query }),
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        returnedData = _a.sent();
                        queryData = returnedData.queryData, queryStats = returnedData.queryStats, queryLabel = returnedData.queryLabel;
                        newQuery = {
                            queryString: '',
                            queryData: queryData,
                            queryStatistics: queryStats,
                            queryLabel: queryLabel,
                        };
                        queries = this.state.queries.slice();
                        // push new query object into copy of queries array
                        queries.push(newQuery);
                        this.setState({ queries: queries });
                        return [2 /*return*/];
                }
            });
        }); };
        // this.onClickTabItem = this.onClickTabItem.bind(this);
        _this.submitQuery = _this.submitQuery.bind(_this);
        return _this;
    }
    MainPanel.prototype.render = function () {
        return (react_1.default.createElement("div", { id: "main-panel" },
            react_1.default.createElement(Tabs_1.Tabs, { queries: this.state.queries, 
                // tableList={this.state.lists.tableList}
                databaseSize: this.state.dbSize, submit: this.submitQuery }),
            react_1.default.createElement("div", { id: "main-left" },
                react_1.default.createElement(History_1.default, { queries: this.state.queries }),
                react_1.default.createElement(Compare_1.Compare, { queries: this.state.queries }))));
    };
    return MainPanel;
}(react_1.Component));
exports.default = MainPanel;
//# sourceMappingURL=MainPanel.js.map