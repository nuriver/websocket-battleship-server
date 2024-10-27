import { Message, ReqMessage } from '../types/types';
import reqLog from '../utils/reqLog';
import addShipsHandler from './requestHandlers/addShipsHandler';
import addUserToRoomHandler from './requestHandlers/addUserToRoomHandler';
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
    addUserToRoomHandler(message, clientId, ws);
  }

  if (message.type === ReqMessage.ADD_SHIPS) {
    reqLog(message.type);
    addShipsHandler(message);
  }

  if (message.type === ReqMessage.ATTACK) {
    reqLog(message.type);
  }
};

export default socketRequestHandler;
