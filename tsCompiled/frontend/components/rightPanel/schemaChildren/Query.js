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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
// const { ipcRenderer } = window.require('electron');
// const { dialog } = require('electron').remote;
// Codemirror configuration
require("codemirror/lib/codemirror.css"); // Styline
require("codemirror/mode/sql/sql"); // Language (Syntax Highlighting)
require("codemirror/theme/lesser-dark.css"); // Theme
var react_codemirror_1 = __importDefault(require("@skidding/react-codemirror"));
var Query = /** @class */ (function (_super) {
    __extends(Query, _super);
    function Query(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            queryString: '',
            queryLabel: '',
            show: false,
            trackQuery: false,
        };
        _this.handleQuerySubmit = _this.handleQuerySubmit.bind(_this);
        _this.updateCode = _this.updateCode.bind(_this);
        _this.handleTrackQuery = _this.handleTrackQuery.bind(_this);
        return _this;
        // this.submitQuery = this.submitQuery.bind(this);
    }
    // componentDidMount() {
    //   ipcRenderer.on('query-error', (event: any, message: string) => {
    //     // dialog.showErrorBox('Error', message);
    //   });
    // }
    // Updates state.queryString as user inputs query label
    Query.prototype.handleLabelEntry = function (event) {
        this.setState({ queryLabel: event.target.value });
    };
    // Updates state.trackQuery as user checks or unchecks box
    Query.prototype.handleTrackQuery = function (event) {
        this.setState({ trackQuery: event.target.checked });
    };
    // Updates state.queryString as user inputs query string
    Query.prototype.updateCode = function (newQueryString) {
        this.setState({
            queryString: newQueryString,
        });
    };
    // Submits query to backend on 'execute-query' channel
    Query.prototype.handleQuerySubmit = function (event) {
        // event.preventDefault();
        // // if query string is empty, show error
        // if (!this.state.queryString) {
        //   dialog.showErrorBox('Please enter a Query.', '');
        // }
        // if (!this.state.trackQuery) {
        //   //functionality to send query but not return stats and track
        //   const queryAndSchema = {
        //     queryString: this.state.queryString,
        //     queryCurrentSchema: this.props.currentSchema,
        //     queryLabel: this.state.queryLabel,
        //   };
        //   ipcRenderer.send('execute-query-untracked', queryAndSchema);
        //   //reset frontend inputs to display as empty and unchecked
        //   this.setState({ queryLabel: '', trackQuery: false, queryString: '' });
        // }
        // if (this.state.trackQuery && !this.state.queryLabel) {
        //   dialog.showErrorBox('Please enter a label for the Query.', '');
        // } else if (this.state.trackQuery) {
        //   // send query and return stats from explain/analyze
        //   const queryAndSchema = {
        //     queryString: this.state.queryString,
        //     queryCurrentSchema: this.props.currentSchema,
        //     queryLabel: this.state.queryLabel,
        //   };
        //   ipcRenderer.send('execute-query-tracked', queryAndSchema);
        //   //reset frontend inputs to display as empty and unchecked
        //   this.setState({ queryLabel: '', trackQuery: false, queryString: '' });
        // }
    };
    Query.prototype.render = function () {
        var _this = this;
        // Codemirror module configuration options
        var options = {
            lineNumbers: true,
            mode: 'sql',
            theme: 'lesser-dark',
        };
        return (react_1.default.createElement("div", { id: "query-panel" },
            react_1.default.createElement("h3", null, "Query"),
            react_1.default.createElement("form", { onSubmit: function (e) { return _this.props.submit(e, _this.state); } },
                react_1.default.createElement("div", { className: "query-label" },
                    react_1.default.createElement("div", { id: "chart-option" },
                        react_1.default.createElement("span", null, "track on chart:"),
                        react_1.default.createElement("input", { id: "track", type: "checkbox", checked: this.state.trackQuery, onChange: this.handleTrackQuery })),
                    react_1.default.createElement("div", { id: "label-option" },
                        react_1.default.createElement("label", null, "label: "),
                        react_1.default.createElement("input", { className: "label-field", type: "text", placeholder: "enter label to track", value: this.state.queryLabel, onChange: function (e) { return _this.handleLabelEntry(e); } }))),
                react_1.default.createElement("br", null),
                react_1.default.createElement("label", null, "Query:"),
                react_1.default.createElement("div", { className: "codemirror" },
                    react_1.default.createElement(react_codemirror_1.default, { onChange: this.updateCode, options: options, value: this.state.queryString })),
                react_1.default.createElement("button", null, "Submit"),
                react_1.default.createElement("br", null),
                react_1.default.createElement("br", null))));
    };
    return Query;
}(react_1.Component));
exports.default = Query;
//# sourceMappingURL=Query.js.map