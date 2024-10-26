"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./src/http_server/index");
const ws_1 = require("ws");
const webSocket_1 = __importDefault(require("./src/webSocket"));
const HTTP_PORT = 3000;
const url = `http://localhost:${HTTP_PORT}`;
const wss = new ws_1.WebSocketServer({ noServer: true });
index_1.httpServer.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});
wss.on('connection', (ws) => {
    console.log('New WebSocket client connected');
    const clientId = Date.now();
    ws.on('message', (clientMessage) => {
        const message = JSON.parse(clientMessage.toString());
        (0, webSocket_1.default)(message, ws, clientId);
    });
});
console.log(`Start static http server on the ${HTTP_PORT} port!`);
index_1.httpServer.listen(HTTP_PORT, () => {
    console.log(`Server is running at ${url}`);
    (0, index_1.openBrowser)(url);
});
//# sourceMappingURL=index.js.map