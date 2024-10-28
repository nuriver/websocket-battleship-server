import { LoginRes, Player } from '../../types/dataTypes';
import WebSocket from 'ws';
import { Message, ResMessage } from '../../types/types';
import { addPlayer, getPlayerByName, getPlayers } from '../../service/players';
import sendResponse from '../../utils/sendResponse';
import { getWinners } from '../../service/winners';
import roomsUpdateNotifier from '../../utils/roomsUpdateNotifier';
import resLog from '../../utils/resLog';
import isPlayerExist from '../../utils/playerExist';

const regHandler = (message: Message, ws: WebSocket, clientId: number) => {
  const data = JSON.parse(message.data as string);
  const players = getPlayers();
  const errorObject = {
    error: false,
    errorText: '',
  };

  const playerExist = isPlayerExist(players, data.name);

  if (playerExist) {
    const player = getPlayerByName(data.name) as Player;

    if (player.status === 'online') {
      errorObject.error = true;
      errorObject.errorText = `Player with name ${data.name} already logged in`;
      resLog(errorObject.errorText);
    }

    if (player.status === 'offline') {
      const isValidPassword = player.password === data.password;

      if (!isValidPassword) {
        errorObject.error = true;
        errorObject.errorText = `Invalid password for ${data.name}`;
        resLog(errorObject.errorText);
      } else {
        player.status = 'online';
        player.index = clientId;
      }
    }
  }

  const regResData: LoginRes = {
    name: data.name,
    index: clientId,
    ...errorObject,
  };

  const regRes = {
    id: 0,
    data: JSON.stringify(regResData),
    type: ResMessage.REG,
  };

  sendResponse(regRes, ws);
  if (errorObject.errorText) {
    resLog(errorObject.errorText);
  }

  if (!playerExist) {
    const player: Player = {
      name: data.name,
      index: clientId,
      password: data.password,
      status: 'online',
    };

    addPlayer(player);
    resLog(`User ${player.name} is logged in`);

    const winners = getWinners();
    const updateWinnersRes = {
      type: ResMessage.UPDATE_WINNERS,
      id: 0,
      data: JSON.stringify(winners),
    };

    resLog(ResMessage.UPDATE_WINNERS);
    sendResponse(updateWinnersRes, ws);

    resLog(ResMessage.UPDATE_ROOM);
    roomsUpdateNotifier();
  }
};

export default regHandler;
