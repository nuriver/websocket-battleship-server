import WebSocket from 'ws';
import { Message, ResMessage } from '../../types/types';
import { addUserToRoom, getRooms } from '../../service/rooms';
import sendResponse, { sendResponseToAll } from '../../utils/sendResponse';
import roomsUpdateNotifier from '../../utils/roomsUpdateNotifier';
import { getClient } from '../../service/clients';
import { createGame } from '../../service/games';

const addUserToRoomHandler = (
  message: Message,
  clientId: number,
  ws: WebSocket
) => {
  const data = JSON.parse(message.data as string);
  const roomId = data.indexRoom;

  if (clientId === roomId) {
    console.log('Result: User is already in the room');
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

  createGame(gameId);
  sendResponse(playerCreateGameRes, wsPlayer);
  sendResponse(enemyCreateGameRes, wsEnemy);
  roomsUpdateNotifier();
};

export default addUserToRoomHandler;
