import { Game, PlayerGameData } from '../types/dataTypes';
import { ResMessage } from '../types/types';
import resLog from '../utils/resLog';
import sendResponse, {
  sendResponseToAll,
  sendResponseToChosen,
} from '../utils/sendResponse';
import { getClient } from './clients';
import { getPlayer } from './players';
import { getWinners, updateWinner } from './winners';

let games: Game[] = [];

const addGame = (game: Game) => {
  games.push(game);
};

export const createGame = (gameId: number) => {
  const game: Game = {
    id: gameId,
    playersData: [],
  };

  addGame(game);
};

export const getGame = (gameId: number) => {
  const game = games.find((game) => game.id === gameId);
  return game;
};

export const getGameByPlayerId = (playerId: number) => {
  const game = games.find(
    (game) =>
      game.playersData[0]?.indexPlayer === playerId ||
      game.playersData[1]?.indexPlayer === playerId
  );
  return game;
};

export const addPlayerToGame = (playerGameData: PlayerGameData) => {
  const targetGame = getGame(playerGameData.gameId as number);
  if (targetGame) {
    const gamePlayer = {
      ...playerGameData,
      checkedCells: [],
    };
    targetGame.playersData.push(gamePlayer);
  }
};

export const gameCanStart = (gameId: number) => {
  const game = getGame(gameId);
  let canStart = false;

  if (game) {
    canStart = game.playersData.length > 1 ? true : false;
  }

  return canStart;
};

export const getGamePlayers = (gameId: number) => {
  const game = getGame(gameId);
  const gamePlayers = game?.playersData;
  return gamePlayers;
};

export const getGamePlayer = (gameId: number, gamePlayerId: number) => {
  const gamePlayers = getGamePlayers(gameId);
  const gamePlayer = gamePlayers?.find(
    (player) => player.indexPlayer === gamePlayerId
  );
  return gamePlayer;
};

export const getGameEnemy = (gameId: number, gamePlayerId: number) => {
  const gamePlayers = getGamePlayers(gameId);
  const gameEnemy = gamePlayers?.find(
    (player) => player.indexPlayer !== gamePlayerId
  );
  return gameEnemy;
};

export const deleteGame = (gameId: number) => {
  games = games.filter((game) => game.id !== gameId);
};

export const finishGame = (
  winnerId: number,
  enemyId: number,
  gameId: number,
  gameAborted: boolean
) => {
  const winnerPlayer = getPlayer(winnerId);
  const winnerSocket = getClient(winnerId);
  const finishResData = {
    winPlayer: winnerId,
  };
  const finishRes = {
    type: ResMessage.FINISH,
    id: 0,
    data: JSON.stringify(finishResData),
  };

  updateWinner(winnerId as number);

  const winners = getWinners();
  const updateWinnersRes = {
    type: ResMessage.UPDATE_WINNERS,
    id: 0,
    data: JSON.stringify(winners),
  };

  if (gameAborted) {
    const whoCancelled = getPlayer(enemyId);
    console.log(`Game was cancelled by ${whoCancelled?.name}`);
    sendResponse(finishRes, winnerSocket);
  } else {
    sendResponseToChosen(finishRes, [winnerId, enemyId]);
  }

  resLog('Game is finished');
  resLog(`${winnerPlayer?.name} is the winner!`);
  resLog(ResMessage.UPDATE_WINNERS);

  sendResponseToAll(updateWinnersRes);
  deleteGame(gameId);
};
