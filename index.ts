import { httpServer, openBrowser } from './src/http_server/index';
import { WebSocketServer } from 'ws';
import socketRequestHandler from './src/webSocket';
import { Message } from './src/types/types';

//TODO change config for unused imports to true;

const HTTP_PORT = 3000;
const url = `http://localhost:${HTTP_PORT}`;

const wss = new WebSocketServer({ noServer: true });

httpServer.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

wss.on('connection', (ws) => {
  console.log('New WebSocket client connected');

  ws.on('message', (clientMessage) => {
    const message: Message = JSON.parse(clientMessage.toString());
    socketRequestHandler(message, ws);
  });
});

console.log(`Start static http server on the ${HTTP_PORT} port!`);

httpServer.listen(HTTP_PORT, () => {
  console.log(`Server is running at ${url}`);
  openBrowser(url);
});
