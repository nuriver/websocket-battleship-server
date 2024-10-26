import { Message, ReqMessage } from '../types/types';
import reqLog from '../utils/reqLog';
import createRoomHandler from './requestHandlers/createRoomHandler.ts';
import regHandler from './requestHandlers/regHandler';
import WebSocket from 'ws';

const socketRequestHandler = (
  message: Message,
  ws: WebSocket,
  clientId: number
) => {
  if (message.type === ReqMessage.REG) {
    reqLog(message.type);
    regHandler(message, ws, clientId);
  }

  if (message.type === ReqMessage.CREATE_ROOM) {
    reqLog(message.type);
    createRoomHandler(ws, clientId);
  }

  if (message.type === ReqMessage.ADD_USER_TO_ROOM) {
    reqLog(message.type);
  }
};

export default socketRequestHandler;
