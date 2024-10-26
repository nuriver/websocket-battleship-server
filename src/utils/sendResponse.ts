import { Message } from '../types/types';
import WebSocket from 'ws';

const sendResponse = (message: Message, ws: WebSocket) => {
  ws.send(JSON.stringify(message));
  console.log(`Result: ${message.type}`);
};

export default sendResponse;
