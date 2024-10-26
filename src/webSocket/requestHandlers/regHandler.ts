import { addPlayer } from '../../service/DB';
import { LoginReq, LoginRes } from '../../types/dataTypes';
import WebSocket from 'ws';
import { ResMessage } from '../../types/types';

const regHandler = (data: LoginReq, ws: WebSocket) => {
  const index = addPlayer(data);

  const loginRes: LoginRes = {
    name: data.name,
    index: index + 1,
    error: false,
    errorText: '',
  };

  const regResponse = JSON.stringify({
    id: 0,
    data: JSON.stringify(loginRes),
    type: ResMessage.REG,
  });

  ws.send(regResponse);
};

export default regHandler;
