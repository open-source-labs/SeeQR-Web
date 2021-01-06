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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_bootstrap_1 = require("react-bootstrap");
// import GenerateData from './GenerateData';
var dialog = require('electron').remote.dialog;
var ipcRenderer = window.require('electron').ipcRenderer;
var SchemaModal = /** @class */ (function (_super) {
    __extends(SchemaModal, _super);
    function SchemaModal(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            schemaName: '',
            schemaFilePath: '',
            schemaEntry: '',
            redirect: false,
            dbCopyName: 'Select Instance',
            copy: false,
        };
        _this.selectHandler = function (eventKey, e) {
            _this.setState({ dbCopyName: eventKey }); //
        };
        _this.dropDownList = function () {
            return _this.props.tabList.map(function (db, index) { return (react_1.default.createElement(react_bootstrap_1.Dropdown.Item, { key: index, eventKey: db, className: "queryItem" }, db)); });
        };
        _this.handleSchemaSubmit = _this.handleSchemaSubmit.bind(_this);
        _this.handleSchemaFilePath = _this.handleSchemaFilePath.bind(_this);
        _this.handleSchemaEntry = _this.handleSchemaEntry.bind(_this);
        _this.handleSchemaName = _this.handleSchemaName.bind(_this);
        _this.selectHandler = _this.selectHandler.bind(_this);
        _this.handleCopyData = _this.handleCopyData.bind(_this);
        _this.dropDownList = _this.dropDownList.bind(_this);
        _this.handleCopyFilePath = _this.handleCopyFilePath.bind(_this);
        return _this;
        // this.handleQueryPrevious = this.handleQueryPrevious.bind(this);
        // this.handleQuerySubmit = this.handleQuerySubmit.bind(this);
    }
    // Set schema name
    SchemaModal.prototype.handleSchemaName = function (event) {
        // convert input label name to lowercase only with no spacing to comply with db naming convention.
        var schemaNameInput = event.target.value;
        var dbSafeName = schemaNameInput.toLowerCase();
        dbSafeName = dbSafeName.replace(/[^A-Z0-9]/gi, '');
        this.setState({ schemaName: dbSafeName });
    };
    // Load schema file path
    // When file path is uploaded, query entry is cleared.
    SchemaModal.prototype.handleSchemaFilePath = function (event) {
        var _this = this;
        event.preventDefault();
        dialog
            .showOpenDialog({
            properties: ['openFile'],
            filters: [{ name: 'Custom File Type', extensions: ['tar', 'sql'] }],
            message: 'Please upload .sql or .tar database file',
        })
            .then(function (result) {
            var filePath = result['filePaths'];
            _this.setState({ schemaFilePath: filePath });
            var schemaObj = {
                schemaName: _this.state.schemaName,
                schemaFilePath: _this.state.schemaFilePath,
                schemaEntry: '',
            };
            if (!result['canceled']) {
                ipcRenderer.send('input-schema', schemaObj);
                _this.setState({ schemaName: '' });
            }
            _this.setState({ dbCopyName: 'Select Instance' });
            _this.props.showModal(event);
        })
            .catch(function (err) { });
    };
    // When schema script is inserted, file path is cleared set dialog to warn user.
    SchemaModal.prototype.handleSchemaEntry = function (event) {
        this.setState({ schemaEntry: event.target.value, schemaFilePath: '' });
        // this.setState({ schemaFilePath: '' });
    };
    SchemaModal.prototype.handleSchemaSubmit = function (event) {
        event.preventDefault();
        var schemaObj = {
            schemaName: this.state.schemaName,
            schemaFilePath: this.state.schemaFilePath,
            schemaEntry: this.state.schemaEntry,
        };
        ipcRenderer.send('input-schema', schemaObj);
    };
    SchemaModal.prototype.handleCopyData = function (event) {
        if (!this.state.copy)
            this.setState({ copy: true });
        else
            this.setState({ copy: false });
    };
    SchemaModal.prototype.handleCopyFilePath = function (event) {
        event.preventDefault();
        var schemaObj = {
            schemaName: this.state.schemaName,
            schemaFilePath: '',
            schemaEntry: '',
            dbCopyName: this.state.dbCopyName,
            copy: this.state.copy,
        };
        ipcRenderer.send('input-schema', schemaObj);
        this.setState({ dbCopyName: "Select Instance" });
        this.setState({ schemaName: '' });
        this.props.showModal(event);
    };
    SchemaModal.prototype.render = function () {
        var _this = this;
        if (this.props.show === false) {
            return null;
        }
        return (react_1.default.createElement("div", { className: "modal", id: "modal" },
            react_1.default.createElement("h3", null,
                "Enter New Schema Name (required): ",
                this.state.schemaName),
            react_1.default.createElement("input", { className: "schema-label", type: "text", placeholder: "Input New Schema Name...", onChange: function (e) { return _this.handleSchemaName(e); } }),
            react_1.default.createElement("div", { className: "load-schema" },
                react_1.default.createElement("h3", null, "Upload New Schema:"),
                react_1.default.createElement("div", { className: "modal-buttons" },
                    react_1.default.createElement("button", { id: "load-button", onClick: this.handleSchemaFilePath }, "Select File"))),
            react_1.default.createElement("br", null),
            react_1.default.createElement("div", { className: "separator" }, "OR"),
            react_1.default.createElement("br", null),
            react_1.default.createElement("div", { className: "copy-instance" },
                react_1.default.createElement("h3", null, "Copy Existing Schema: "),
                react_1.default.createElement(react_bootstrap_1.Dropdown, { id: "select-dropdown", onSelect: this.selectHandler },
                    react_1.default.createElement(react_bootstrap_1.Dropdown.Toggle, null, this.state.dbCopyName),
                    react_1.default.createElement(react_bootstrap_1.Dropdown.Menu, null, this.dropDownList()))),
            react_1.default.createElement("div", { className: "data-checkbox" },
                react_1.default.createElement("p", { title: "Do not check box if you'd like a shell copy of an existing DB" }, "With Data?"),
                react_1.default.createElement("input", { id: "copy-data-checkbox", type: "checkbox", name: "Data", onClick: this.handleCopyData }),
                react_1.default.createElement("button", { id: "copy-button", className: "modal-buttons", onClick: this.handleCopyFilePath }, "Make Copy")),
            react_1.default.createElement("button", { className: "close-button", onClick: function () {
                    _this.props.onClose();
                    _this.setState({ dbCopyName: 'Select Instance' });
                    _this.setState({ schemaName: '' });
                } }, "X")));
    };
    return SchemaModal;
}(react_1.Component));
exports.default = SchemaModal;
{
    /* <DropdownButton id="add-query-button" title="Select Instance &#9207;">
              {this.dropDownList()}
            </DropdownButton> */
}
//# sourceMappingURL=SchemaModal.js.map