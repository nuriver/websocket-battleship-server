import { Message, ReqMessage } from '../types/types';
import reqLog from '../utils/reqLog';
import regHandler from './requestHandlers/regHandler';
import WebSocket from 'ws';

const socketRequestHandler = (message: Message, ws: WebSocket) => {
  console.log(message);

  if (message.type === ReqMessage.REG) {
    reqLog(message.type);
    regHandler(message, ws);
  }
};

export default socketRequestHandler;
