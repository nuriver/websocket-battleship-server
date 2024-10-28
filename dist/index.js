"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wss = void 0;
const index_1 = require("./src/http_server/index");
const ws_1 = require("ws");
const webSocket_1 = __importDefault(require("./src/webSocket"));
const clients_1 = require("./src/service/clients");
const HTTP_PORT = 3000;
const url = `http://localhost:${HTTP_PORT}`;
exports.wss = new ws_1.WebSocketServer({ noServer: true });
index_1.httpServer.on('upgrade', (request, socket, head) => {
    exports.wss.handleUpgrade(request, socket, head, (ws) => {
        exports.wss.emit('connection', ws, request);
    });
});
exports.wss.on('connection', (ws) => {
    console.log(`New WebSocket client connected on the ${HTTP_PORT} port at ${url}`);
    const clientId = Date.now();
    (0, clients_1.addClient)(clientId, ws);
    ws.on('message', (clientMessage) => {
        const message = JSON.parse(clientMessage.toString());
        (0, webSocket_1.default)(message, ws, clientId);
    });
    ws.on('close', () => {
        (0, clients_1.deleteClient)(clientId);
    });
});
console.log(`Start static http server on the ${HTTP_PORT} port!`);
index_1.httpServer.listen(HTTP_PORT, () => {
    console.log(`Server is running at ${url}`);
    (0, index_1.openBrowser)(url);
});
//# sourceMappingURL=index.js.map