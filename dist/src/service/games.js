"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGamePlayer = exports.getGamePlayers = exports.gameCanStart = exports.addPlayerToGame = exports.getGame = exports.createGame = void 0;
let games = [];
const addGame = (game) => {
    games.push(game);
};
const createGame = (gameId) => {
    const game = {
        id: gameId,
        playersData: [],
    };
    addGame(game);
};
exports.createGame = createGame;
const getGame = (gameId) => {
    const targetGame = games.find((game) => game.id === gameId);
    return targetGame;
};
exports.getGame = getGame;
const addPlayerToGame = (playerGameData) => {
    const targetGame = (0, exports.getGame)(playerGameData.gameId);
    if (targetGame) {
        targetGame.playersData.push(playerGameData);
    }
};
exports.addPlayerToGame = addPlayerToGame;
const gameCanStart = (gameId) => {
    const game = (0, exports.getGame)(gameId);
    let canStart = false;
    if (game) {
        canStart = game.playersData.length > 1 ? true : false;
    }
    return canStart;
};
exports.gameCanStart = gameCanStart;
const getGamePlayers = (gameId) => {
    const game = (0, exports.getGame)(gameId);
    const gamePlayers = game?.playersData;
    return gamePlayers;
};
exports.getGamePlayers = getGamePlayers;
const getGamePlayer = (gameId, gamePlayerId) => {
    const game = (0, exports.getGame)(gameId);
    const gamePlayers = (0, exports.getGamePlayers)(gameId);
    const gamePlayer = gamePlayers?.find((player) => player.indexPlayer === gamePlayerId);
    return gamePlayer;
};
exports.getGamePlayer = getGamePlayer;
//# sourceMappingURL=games.js.map