import { LoginReq } from '../types/dataTypes';
import { Message, ReqMessage } from '../types/types';
import regHandler from './requestHandlers/regHandler';
import WebSocket from 'ws';

const socketRequestHandler = (message: Message, ws: WebSocket) => {
  const data = JSON.parse(message.data);

  if (message.type === ReqMessage.REG) {
    regHandler(data, ws);
  }
};

export default socketRequestHandler;
