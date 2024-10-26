"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponseToChosen = exports.sendResponseToAll = void 0;
const __1 = require("../..");
const clients_1 = require("../service/clients");
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
const sendResponseToChosen = (message, clientIds) => {
    const clients = (0, clients_1.getClients)();
    const sockets = getValuesFromMap(clients, clientIds);
    sockets.forEach((socket) => {
        if (socket.readyState === ws_1.default.OPEN) {
            socket.send(JSON.stringify(message));
            console.log(`Result: ${message.type}`);
        }
    });
};
exports.sendResponseToChosen = sendResponseToChosen;
//# sourceMappingURL=sendResponse.js.map