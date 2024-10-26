import { wss } from '../..';
import { Message } from '../types/types';
import WebSocket from 'ws';

const sendResponse = (message: Message, ws: WebSocket) => {
  ws.send(JSON.stringify(message));
  console.log(`Result: ${message.type}`);
};

export default sendResponse;

export const sendResponseToAll = (message: Message) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
      console.log(`Result: ${message.type}`);
    }
  });
};
