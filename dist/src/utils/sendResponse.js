"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponseToAll = void 0;
const __1 = require("../..");
const ws_1 = __importDefault(require("ws"));
const sendResponse = (message, ws) => {
    ws.send(JSON.stringify(message));
    console.log(`Result: ${message.type}`);
};
exports.default = sendResponse;
const sendResponseToAll = (message) => {
    __1.wss.clients.forEach((client) => {
        if (client.readyState === ws_1.default.OPEN) {
            client.send(JSON.stringify(message));
            console.log(`Result: ${message.type}`);
        }
    });
};
exports.sendResponseToAll = sendResponseToAll;
//# sourceMappingURL=sendResponse.js.map