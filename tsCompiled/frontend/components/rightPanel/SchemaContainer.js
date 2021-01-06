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
exports.SchemaContainer = void 0;
var react_1 = __importStar(require("react"));
var Data_1 = require("./schemaChildren/Data");
var Query_1 = __importDefault(require("./schemaChildren/Query"));
var SchemaContainer = /** @class */ (function (_super) {
    __extends(SchemaContainer, _super);
    function SchemaContainer(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            currentSchema: '',
        };
        return _this;
    }
    SchemaContainer.prototype.render = function () {
        return (react_1.default.createElement("div", { id: "main-right" },
            react_1.default.createElement("div", { id: "test-panels" },
                react_1.default.createElement("div", { id: "schema-left" },
                    react_1.default.createElement("div", null,
                        react_1.default.createElement(Query_1.default, { submit: this.props.submit, dbSize: this.props.databaseSize })),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement(Data_1.Data, { queries: this.props.queries }))))));
    };
    return SchemaContainer;
}(react_1.Component));
exports.SchemaContainer = SchemaContainer;
//# sourceMappingURL=SchemaContainer.js.map