"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_loading_1 = __importDefault(require("react-loading"));
// "Loading" pop up renders whenever async functions are called
var LoadingModal = function (props) {
    if (props.show) {
        return (react_1.default.createElement("div", { id: "loading-modal", className: "modal" },
            react_1.default.createElement("h3", null, "LOADING..."),
            react_1.default.createElement(react_loading_1.default, { type: "cylon", color: "#6cbba9" })));
    }
    else
        return null;
};
exports.default = LoadingModal;
//# sourceMappingURL=LoadingModal.js.map