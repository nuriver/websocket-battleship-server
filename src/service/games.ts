import { Game, PlayerGameData } from '../types/dataTypes';

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
  const targetGame = games.find((game) => game.id === gameId);
  return targetGame;
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
