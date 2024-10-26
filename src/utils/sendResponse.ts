import { wss } from '../..';
import { getClients } from '../service/clients';
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

export const sendResponseToChosen = (message: Message, clientIds: number[]) => {
  const clients = getClients();
  const sockets = getValuesFromMap(clients, clientIds);
  sockets.forEach((socket) => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
      console.log(`Result: ${message.type}`);
    }
  });
};
