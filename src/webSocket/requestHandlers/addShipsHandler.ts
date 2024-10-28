import { getClient } from '../../service/clients';
import { addPlayerToGame, gameCanStart, getGame } from '../../service/games';
import { getPlayer } from '../../service/players';
import { createShipField } from '../../service/ships';
import { Game, PlayerGameData } from '../../types/dataTypes';
import { Message, ResMessage } from '../../types/types';
import resLog from '../../utils/resLog';
import sendResponse, { sendResponseToChosen } from '../../utils/sendResponse';

const addShipsHandler = (message: Message) => {
  const data: PlayerGameData = JSON.parse(message.data as string);
  const player = getPlayer(data.indexPlayer);

  addPlayerToGame(data);
  createShipField(data);

  resLog(`Ships for ${player?.name} were added to the game`);

  if (gameCanStart(data.gameId)) {
    const game = getGame(data.gameId) as Game;

    const playerData1 = game?.playersData[0];
    const playerData2 = game?.playersData[1];
    const nextTurnPlayer = getPlayer(playerData1?.indexPlayer as number);
    game.currentTurn = playerData1?.indexPlayer;

    const starGameResForPlayer1 = {
      type: ResMessage.START_GAME,
      data: JSON.stringify({
        ships: playerData1?.ships,
        currentIndexPlayer: playerData1?.indexPlayer,
      }),
      id: 0,
    };

    const starGameResForPlayer2 = {
      type: ResMessage.START_GAME,
      data: JSON.stringify({
        ships: playerData2?.ships,
        currentIndexPlayer: playerData2?.indexPlayer,
      }),
      id: 0,
    };

    const turnRes = {
      type: ResMessage.TURN,
      id: 0,
      data: JSON.stringify({
        currentPlayer: playerData1?.indexPlayer,
      }),
    };

    const playerSocket1 = getClient(playerData1?.indexPlayer as number);
    const playerSocket2 = getClient(playerData2?.indexPlayer as number);

    resLog(ResMessage.START_GAME);
    sendResponse(starGameResForPlayer1, playerSocket1);
    sendResponse(starGameResForPlayer2, playerSocket2);

    resLog(`Next turn is ${nextTurnPlayer?.name}`);
    sendResponseToChosen(turnRes, [
      playerData1?.indexPlayer as number,
      playerData2?.indexPlayer as number,
    ]);
  }
};

export default addShipsHandler;
