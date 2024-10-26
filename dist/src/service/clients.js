"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClient = exports.deleteClient = exports.addClient = void 0;
const players_1 = require("./players");
const clients = new Map();
const addClient = (clientId, ws) => {
    clients.set(clientId, ws);
};
exports.addClient = addClient;
const deleteClient = (clientId) => {
    clients.delete(clientId);
    (0, players_1.deletePlayer)(clientId);
};
exports.deleteClient = deleteClient;
const getClient = (clientId) => {
    const ws = clients.get(clientId);
    return ws;
};
exports.getClient = getClient;
//# sourceMappingURL=clients.js.map