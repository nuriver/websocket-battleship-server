import { httpServer, openBrowser } from './src/http_server/index';
import { WebSocketServer } from 'ws';
import socketRequestHandler from './src/webSocket';
import { Message } from './src/types/types';
import { addClient } from './src/service/clients';
import onCloseHandler from './src/utils/onCloseHandler';

const HTTP_PORT = 3000;
const url = `http://localhost:${HTTP_PORT}`;

export const wss = new WebSocketServer({ noServer: true });

httpServer.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

wss.on('connection', (ws) => {
  console.log(
    `New WebSocket client connected on the ${HTTP_PORT} port at ${url}`
  );
  const clientId = Date.now();
  addClient(clientId, ws);

  ws.on('message', (clientMessage) => {
    const message: Message = JSON.parse(clientMessage.toString());
    socketRequestHandler(message, ws, clientId);
  });

  ws.on('close', () => {
    onCloseHandler(clientId);
  });
});

console.log(`Start static http server on the ${HTTP_PORT} port!`);

httpServer.listen(HTTP_PORT, () => {
  console.log(`Server is running at ${url}`);
  openBrowser(url);
});

const closeWebSocketServer = () => {
  wss.clients.forEach((client) => client.close());
  wss.close(() => {
    console.log('WebSocket server closed');
    process.exit(0); 
  });
};

process.on('SIGINT', closeWebSocketServer);
process.on('SIGTERM', closeWebSocketServer);