import { LoginRes } from '../../types/dataTypes';
import WebSocket from 'ws';
import { Message, ResMessage } from '../../types/types';
import { addPlayer } from '../../service/players';
import sendResponse from '../../utils/sendResponse';
import { getWinners } from '../../service/winners';
import { getRooms } from '../../service/rooms';

const regHandler = (message: Message, ws: WebSocket) => {
  const data = JSON.parse(message.data as string);
  const index = addPlayer(data);

  const loginRes: LoginRes = {
    name: data.name,
    index: index + 1,
    error: false,
    errorText: '',
  };
  const regRes = {
    id: 0,
    data: JSON.stringify(loginRes),
    type: ResMessage.REG,
  };

  sendResponse(regRes, ws);

  const winners = getWinners();
  const updateWinnersRes = {
    type: ResMessage.UPDATE_WINNERS,
    id: 0,
    data: JSON.stringify(winners),
  };

  sendResponse(updateWinnersRes, ws);

  const rooms = getRooms();
  const updateRoomRes = {
    type: ResMessage.UPDATE_ROOM,
    id: 0,
    data: JSON.stringify(rooms),
  };

  sendResponse(updateRoomRes, ws);
};

export default regHandler;
