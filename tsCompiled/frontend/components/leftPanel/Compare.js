"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compare = void 0;
var react_1 = __importStar(require("react"));
var DropdownButton_1 = __importDefault(require("react-bootstrap/DropdownButton"));
var Dropdown_1 = __importDefault(require("react-bootstrap/Dropdown"));
var react_chartjs_2_1 = require("react-chartjs-2");
react_chartjs_2_1.defaults.global.defaultFontColor = 'rgb(198,210,213)';
exports.Compare = function (props) {
    // -------------------------------------------------------------------------------------------------------------
    // ------------------------------------ logic for setting state --------------------------------------------
    // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    // declaring initial state
    var initial = __assign(__assign({}, props), { compareList: [] });
    var _a = react_1.useState(initial), queryInfo = _a[0], setCompare = _a[1];
    var addCompareQuery = function (event) {
        // compare list is a dropdown menu on the front-end
        var compareList = queryInfo.compareList;
        props.queries.forEach(function (query) {
            // if the query is clicked in the dropdown menu
            if (query.queryLabel === event.target.text) {
                // only allow the addition of queries that aren't already being compared
                if (!compareList.includes(query)) {
                    compareList.push(query);
                }
            }
        });
        // reset state to account for the change in queries being tracked
        setCompare(__assign(__assign({}, queryInfo), { compareList: compareList }));
    };
    // -------------------------------------------------------------------------------------------------------------
    // ------------------------------------ logic for the compare query table --------------------------------------
    // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    var deleteCompareQuery = function (event) {
        // reset comparelist so that the query that is chosen is not included any more
        var compareList = queryInfo.compareList.filter(function (query) { return query.queryLabel !== event.target.id; });
        setCompare(__assign(__assign({}, queryInfo), { compareList: compareList }));
    };
    var dropDownList = function () {
        // for each query on the query list, make a dropdown item in the menu
        return props.queries.map(function (query, index) { return (react_1.default.createElement(Dropdown_1.default.Item, { key: index, className: "queryItem", onClick: addCompareQuery }, query.queryLabel)); });
    };
    // Rendering the compare table with selected queries from dropdown list
    var renderCompare = function () {
        return queryInfo.compareList.map(function (query, index) {
            // destructuring data and variables from queries on the compare list
            var queryString = query.queryString, queryData = query.queryData, queryStatistics = query.queryStatistics, queryLabel = query.queryLabel;
            var queryPlan = queryStatistics[0]["QUERY PLAN"];
            var _a = queryPlan[0], Plan = _a.Plan, planningTime = _a["Planning Time"], executionTime = _a["Execution Time"];
            var scanType = Plan["Node Type"], actualRows = Plan["Actual Rows"], actualStartupTime = Plan["Actual Startup Time"], actualTotalTime = Plan["Actual Total Time"], loops = Plan["Actual Loops"];
            var runtime = (planningTime + executionTime).toFixed(3);
            // To display additional analytics, comment back in JSX elements in the return statement below.
            return (react_1.default.createElement("tr", { key: index },
                react_1.default.createElement("td", { id: "label" }, queryLabel),
                react_1.default.createElement("td", { id: "actual-rows" }, actualRows),
                react_1.default.createElement("td", { id: "runtime" }, runtime),
                react_1.default.createElement("td", { id: "time-al" }, actualTotalTime),
                react_1.default.createElement("td", null,
                    react_1.default.createElement("button", { id: queryLabel, className: "delete-query-button", onClick: deleteCompareQuery }, "X"))));
        });
    };
    // -------------------------------------------------------------------------------------------------------------
    // ------------------------------------ logic for the compare query graph --------------------------------------
    // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    var generateDatasets = function () {
        var _a, _b;
        var compareList = queryInfo.compareList;
        // first we create an object with all of the comparelist data organized in a way that enables us to render our graph easily
        var compareDataObject = {};
        // then we populate that object
        for (var _i = 0, compareList_1 = compareList; _i < compareList_1.length; _i++) {
            var query = compareList_1[_i];
            var queryLabel = query.queryLabel, querySchema = query.querySchema, queryStatistics = query.queryStatistics;
            if (!compareDataObject[querySchema]) {
                compareDataObject[querySchema] = (_a = {},
                    _a[queryLabel.toString()] = queryStatistics[0]['QUERY PLAN'][0]['Execution Time'] +
                        queryStatistics[0]['QUERY PLAN'][0]['Planning Time'],
                    _a);
            }
            else {
                compareDataObject[querySchema][queryLabel.toString()] =
                    queryStatistics[0]['QUERY PLAN'][0]['Execution Time'] +
                        queryStatistics[0]['QUERY PLAN'][0]['Planning Time'];
            }
        }
        // then we generate a labelData array to store all unique query labels
        var labelDataArray = [];
        for (var schema in compareDataObject) {
            for (var label in compareDataObject[schema]) {
                if (!labelDataArray.includes(label)) {
                    labelDataArray.push(label);
                }
            }
        }
        // then we generate an array of data for each schema, storing data for each unique query according to the schema
        var runTimeDataArray = [];
        for (var schema in compareDataObject) {
            var schemaArray = [];
            for (var _c = 0, labelDataArray_1 = labelDataArray; _c < labelDataArray_1.length; _c++) {
                var label = labelDataArray_1[_c];
                schemaArray.push(compareDataObject[schema][label]
                    ? compareDataObject[schema][label]
                    : 0);
            }
            runTimeDataArray.push((_b = {}, _b[schema] = schemaArray, _b));
        }
        // creating a list of possible colors for the graph
        var schemaColors = {
            nextColor: 0,
            colorList: [
                '#006C67',
                '#F194B4',
                '#FFB100',
                '#FFEBC6',
                '#A4036F',
                '#048BA8',
                '#16DB93',
                '#EFEA5A',
                '#F29E4C',
            ],
        };
        // then we generate datasets for each schema for the bar chart
        var datasets = runTimeDataArray.map(function (schemaDataObject) {
            var schemaLabel = Object.keys(schemaDataObject)[0];
            var color = schemaColors.colorList[schemaColors.nextColor % schemaColors.colorList.length];
            schemaColors.nextColor += 1;
            return {
                label: "" + schemaLabel,
                backgroundColor: color,
                borderColor: color,
                borderWidth: 1,
                data: schemaDataObject[schemaLabel],
            };
        });
        //then we combine the label array and the data arrays for each schema into a data object to pass to our bar graph
        return {
            labels: labelDataArray,
            datasets: datasets,
        };
    };
    // -------------------------------------------------------------------------------------------------------------
    // ------------------------------------ rendering the elements -------------------------------------------------
    // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    return (react_1.default.createElement("div", { id: "compare-panel" },
        react_1.default.createElement("h3", null, "Comparisons"),
        react_1.default.createElement(DropdownButton_1.default, { id: "add-query-button", title: "Add Query Data \u23F7" }, dropDownList()),
        react_1.default.createElement("div", { className: "compare-container" },
            react_1.default.createElement("table", { className: "compare-box" },
                react_1.default.createElement("tbody", null,
                    react_1.default.createElement("tr", { className: "top-row" },
                        react_1.default.createElement("td", null, 'Query Label'),
                        react_1.default.createElement("td", null, 'Schema'),
                        react_1.default.createElement("td", null, 'Total Rows'),
                        react_1.default.createElement("td", null, 'Runtime (ms)'),
                        react_1.default.createElement("td", null, 'Total Time')),
                    renderCompare()))),
        react_1.default.createElement("div", { className: "bar-chart" },
            react_1.default.createElement(react_chartjs_2_1.Bar, { data: generateDatasets(), options: {
                    title: {
                        display: true,
                        text: 'QUERY BY RUNTIME (ms)',
                        fontSize: 16,
                    },
                    legend: {
                        display: true,
                        position: 'right',
                    },
                    maintainAspectRatio: false,
                } }))));
};
//# sourceMappingURL=Compare.js.map