import { deleteClient } from '../service/clients';
import { finishGame, getGameByPlayerId, getGameEnemy } from '../service/games';
import { setPlayerOffline } from '../service/players';
import { deleteRoom } from '../service/rooms';
import roomsUpdateNotifier from './roomsUpdateNotifier';

const onCloseHandler = (clientId: number) => {
  const game = getGameByPlayerId(clientId);
  const playerOneShips = game?.playersData[0]?.ships;
  const playerTwoShips = game?.playersData[1]?.ships;

  deleteClient(clientId);
  setPlayerOffline(clientId);
  deleteRoom(clientId);
  roomsUpdateNotifier();

  if (game && playerOneShips?.length !== 0 && playerTwoShips?.length !== 0) {
    const enemy = getGameEnemy(game.id, clientId);
    finishGame(enemy?.indexPlayer as number, clientId, game.id, true);
  }
};

export default onCloseHandler;
