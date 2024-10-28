import { Message, ResMessage } from '../../types/types';
import { addUserToRoom } from '../../service/rooms';
import sendResponse from '../../utils/sendResponse';
import roomsUpdateNotifier from '../../utils/roomsUpdateNotifier';
import { getClient } from '../../service/clients';
import { createGame } from '../../service/games';
import resLog from '../../utils/resLog';
import { getPlayer } from '../../service/players';

const addUserToRoomHandler = (message: Message, clientId: number) => {
  const data = JSON.parse(message.data as string);
  const roomId = data.indexRoom;

  if (clientId === roomId) {
    resLog('User is already in the room');
    return;
  }

  addUserToRoom(roomId, clientId);
  const gameId = Date.now();
  const wsPlayer = getClient(clientId);
  const wsEnemy = getClient(roomId);
  const playerCreateGameRes = {
    id: 0,
    type: ResMessage.CREATE_GAME,
    data: JSON.stringify({
      idPlayer: clientId,
      idGame: gameId,
    }),
  };
  const enemyCreateGameRes = {
    ...playerCreateGameRes,
    data: JSON.stringify({
      idPlayer: roomId,
      idGame: gameId,
    }),
  };

  const player = getPlayer(clientId);
  const enemy = getPlayer(roomId);

  resLog(`User ${player?.name} was added to the room to ${enemy?.name}`);
  roomsUpdateNotifier();

  createGame(gameId);
  sendResponse(playerCreateGameRes, wsPlayer);
  sendResponse(enemyCreateGameRes, wsEnemy);
  resLog(ResMessage.CREATE_GAME);
};

export default addUserToRoomHandler;
