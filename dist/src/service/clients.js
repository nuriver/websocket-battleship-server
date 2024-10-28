"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClient = exports.getClients = exports.deleteClient = exports.addClient = void 0;
const players_1 = require("./players");
const rooms_1 = require("./rooms");
const roomsUpdateNotifier_1 = __importDefault(require("../utils/roomsUpdateNotifier"));
const clients = new Map();
const addClient = (clientId, ws) => {
    clients.set(clientId, ws);
};
exports.addClient = addClient;
const deleteClient = (clientId) => {
    clients.delete(clientId);
    (0, players_1.setPlayerOffline)(clientId);
    (0, rooms_1.deleteRoom)(clientId);
    (0, roomsUpdateNotifier_1.default)();
};
exports.deleteClient = deleteClient;
const getClients = () => {
    return clients;
};
exports.getClients = getClients;
const getClient = (clientId) => {
    const ws = clients.get(clientId);
    return ws;
};
exports.getClient = getClient;
//# sourceMappingURL=clients.js.map