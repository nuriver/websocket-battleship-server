import { Message, ReqMessage } from '../types/types';
import reqLog from '../utils/reqLog';
import addShipsHandler from './requestHandlers/addShipsHandler';
import addUserToRoomHandler from './requestHandlers/addUserToRoomHandler';
import attackHandler from './requestHandlers/attackHandler';
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
    createRoomHandler(clientId);
  }

  if (message.type === ReqMessage.ADD_USER_TO_ROOM) {
    reqLog(message.type);
    addUserToRoomHandler(message, clientId);
  }

  if (message.type === ReqMessage.ADD_SHIPS) {
    reqLog(message.type);
    addShipsHandler(message);
  }

  if (
    message.type === ReqMessage.ATTACK ||
    message.type === ReqMessage.RANDOM_ATTACK
  ) {
    attackHandler(message);
  }
};

export default socketRequestHandler;
