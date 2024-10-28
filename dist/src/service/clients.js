"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClient = exports.getClients = exports.deleteClient = exports.addClient = void 0;
const clients = new Map();
const addClient = (clientId, ws) => {
    clients.set(clientId, ws);
};
exports.addClient = addClient;
const deleteClient = (clientId) => {
    clients.delete(clientId);
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