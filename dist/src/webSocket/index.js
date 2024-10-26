"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types/types");
const regHandler_1 = __importDefault(require("./requestHandlers/regHandler"));
const socketRequestHandler = (message, ws) => {
    const data = JSON.parse(message.data);
    if (message.type === types_1.ReqMessage.REG) {
        (0, regHandler_1.default)(data, ws);
    }
};
exports.default = socketRequestHandler;
//# sourceMappingURL=index.js.map