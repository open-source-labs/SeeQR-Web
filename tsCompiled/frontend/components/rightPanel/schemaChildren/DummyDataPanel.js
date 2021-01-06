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
var react_1 = __importStar(require("react"));
var Dropdown_1 = __importDefault(require("react-bootstrap/Dropdown"));
var DummyDataPanel = /** @class */ (function (_super) {
    __extends(DummyDataPanel, _super);
    function DummyDataPanel(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            currentTable: 'select table',
            dataInfo: {},
            rowNumber: ''
        };
        //handler to change the dropdown display to the selected table name
        _this.selectHandler = function (eventKey, e) {
            if (eventKey !== 'none') {
                _this.setState({ currentTable: eventKey });
            }
        };
        //function to generate the dropdown optiosn from the table names in state
        _this.dropDownList = function () {
            var result = [];
            var tableName;
            // Checks to make sure tables are available to generate dummy data to.
            // Allows user to choose a specific table, or to write dummy data to all tables.
            if (_this.props.tableList.length > 0) {
                for (var i = 0; i <= _this.props.tableList.length; i++) {
                    if (_this.props.tableList[i])
                        tableName = _this.props.tableList[i];
                    else
                        tableName = 'all';
                    result.push(react_1.default.createElement(Dropdown_1.default.Item, { key: i, className: "queryItem", eventKey: tableName }, tableName));
                }
            }
            else {
                // Adds message in dropdown list to show that not tables are available
                // Went this route because we couldn't get the dropdown to disappear if there were no tables in tableList
                result.push(react_1.default.createElement(Dropdown_1.default.Item, { key: 'key', className: "queryItem", eventKey: 'none' }, "No tables available!"));
            }
            return result;
        };
        //submit listener to add table name and rows to the dataInfo object in state
        _this.addToTable = function (event) {
            // event.preventDefault();
            // //if no number is entered
            // if (!this.state.rowNumber) {
            //   dialog.showErrorBox('Please enter a number of rows.', '');
            // }
            // if (this.state.currentTable === 'select table') {
            //   dialog.showErrorBox('Please select a table.', '');
            // }
            // //reset input fields and update nested object in state
            // else {
            //   let table = this.state.currentTable;
            //   let number = Number(this.state.rowNumber);
            //     if (table !== 'all') {
            //       this.setState(prevState => ({
            //         ...prevState,
            //         currentTable: 'select table',
            //         rowNumber: '',
            //         dataInfo: {
            //           ...prevState.dataInfo,
            //           [table]: number
            //         }
            //       }))
            //     }
            //     else {
            //       const dataInfo = {};
            //       this.props.tableList.forEach(table => {
            //         if (table !== 'all') {
            //           dataInfo[table] = number;
            //         }
            //       })
            //       this.setState(prevState => ({
            //         ...prevState,
            //         currentTable: 'select table',
            //         rowNumber: '',
            //         dataInfo
            //       }))
            //     }
            //   }
        };
        //onclick listener to delete row from table
        _this.deleteRow = function (event) {
            var name = event.target.id;
            _this.setState(function (prevState) {
                var _a;
                return (__assign(__assign({}, prevState), { dataInfo: __assign(__assign({}, prevState.dataInfo), (_a = {}, _a[name] = undefined, _a)) }));
            });
        };
        //onchange listener to update the rowNumber string in state
        _this.changeRowNumber = function (event) {
            _this.setState({ rowNumber: event.target.value });
        };
        _this.createRow = function () {
            //once state updates on click, render the table row from the object
            var newRows = [];
            for (var key in _this.state.dataInfo) {
                if (_this.state.dataInfo[key]) {
                    newRows.push(react_1.default.createElement("tr", { className: "dummy-table-row", key: key },
                        react_1.default.createElement("td", null, key),
                        react_1.default.createElement("td", null, _this.state.dataInfo[key]),
                        react_1.default.createElement("td", null,
                            react_1.default.createElement("button", { id: key, onClick: _this.deleteRow }, "x"))));
                }
            }
            return newRows;
        };
        _this.submitDummyData = function (event) {
            // //check if there are requested dummy data values
            // if (Object.keys(this.state.dataInfo).length) {
            //   //creates a dummyDataRequest object with schema name and table name/rows
            //   const dummyDataRequest = {
            //     schemaName: this.props.currentSchema,
            //     dummyData: this.state.dataInfo
            //   }
            //   ipcRenderer.send('generate-dummy-data', dummyDataRequest);
            //   //reset state to clear the dummy data panel's table
            //   this.setState({dataInfo: {}});
            // }
            // else dialog.showErrorBox('Please add table and row numbers', '');
        };
        _this.dropDownList = _this.dropDownList.bind(_this);
        _this.selectHandler = _this.selectHandler.bind(_this);
        _this.addToTable = _this.addToTable.bind(_this);
        _this.changeRowNumber = _this.changeRowNumber.bind(_this);
        _this.deleteRow = _this.deleteRow.bind(_this);
        _this.submitDummyData = _this.submitDummyData.bind(_this);
        return _this;
    }
    DummyDataPanel.prototype.render = function () {
        return (react_1.default.createElement("div", { className: "dummy-data-panel" },
            react_1.default.createElement("h3", null, "Generate Dummy Data"),
            react_1.default.createElement("p", null, "Select table and number of rows:"),
            react_1.default.createElement("div", { className: "dummy-data-select" },
                react_1.default.createElement(Dropdown_1.default, { onSelect: this.selectHandler },
                    react_1.default.createElement(Dropdown_1.default.Toggle, null, this.state.currentTable),
                    react_1.default.createElement(Dropdown_1.default.Menu, { className: "DD-Dropdown" }, this.dropDownList())),
                react_1.default.createElement("input", { id: "dummy-rows-input", type: "text", placeholder: "number of rows...", value: this.state.rowNumber, onChange: this.changeRowNumber }),
                react_1.default.createElement("button", { id: "dummy-rows-button", onClick: this.addToTable }, "add to table")),
            react_1.default.createElement("div", { className: "dummy-data-table-container" },
                react_1.default.createElement("table", { className: "dummy-data-table" },
                    react_1.default.createElement("tbody", null,
                        react_1.default.createElement("tr", { className: "top-row" },
                            react_1.default.createElement("th", null, "table"),
                            react_1.default.createElement("th", null, "# of rows"),
                            react_1.default.createElement("th", null, "delete")),
                        this.createRow()))),
            react_1.default.createElement("div", { id: "generate-dummy-data" },
                react_1.default.createElement("button", { onClick: this.submitDummyData }, "Generate Dummy Data"))));
    };
    return DummyDataPanel;
}(react_1.Component));
exports.default = DummyDataPanel;
//# sourceMappingURL=DummyDataPanel.js.map