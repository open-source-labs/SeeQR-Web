"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Splash = void 0;
var react_1 = __importDefault(require("react"));
function Splash(props) {
    // a dialogue menu with retrieve the file path
    return (react_1.default.createElement("div", { id: "splash-page" },
        react_1.default.createElement("div", { className: "logo" }),
        react_1.default.createElement("h4", null, "Welcome!"),
        react_1.default.createElement("div", { className: "splash-buttons" },
            react_1.default.createElement("div", { id: "custom-schema" },
                react_1.default.createElement("h4", null, "Create custom schema"),
                react_1.default.createElement("button", { id: "skip_button", onClick: props.handleSkipClick }, "Create")),
            react_1.default.createElement("div", { id: "import-schema" },
                react_1.default.createElement("h4", null, "Import database in .sql or .tar"),
                react_1.default.createElement("input", { type: "file", id: "fileUpload", onClick: props.handleFileClick })))));
}
exports.Splash = Splash;
//# sourceMappingURL=Splash.js.map