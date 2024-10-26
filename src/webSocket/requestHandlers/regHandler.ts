import { LoginRes } from '../../types/dataTypes';
import WebSocket from 'ws';
import { Message, ResMessage } from '../../types/types';
import { addPlayer, getPlayers } from '../../service/players';
import sendResponse from '../../utils/sendResponse';
import { getWinners } from '../../service/winners';
import roomsUpdateNotifier from '../../utils/roomsUpdateNotifier';

const regHandler = (message: Message, ws: WebSocket, clientId: number) => {
  const data = JSON.parse(message.data as string);
  const player = {
    name: data.name,
    index: clientId,
    password: data.password,
  };

  const players = getPlayers();
  const playerExist = players.some((player) => {
    return player.name === data.name;
  });

  const loginRes: LoginRes = {
    name: data.name,
    index: clientId,
    error: playerExist ? true : false,
    errorText: playerExist
      ? `Player with name ${data.name} already logged in`
      : '',
  };

  addPlayer(player);

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

  roomsUpdateNotifier();
};

export default regHandler;
