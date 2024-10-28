"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.finishGame = exports.deleteGame = exports.getGameEnemy = exports.getGamePlayer = exports.getGamePlayers = exports.gameCanStart = exports.addPlayerToGame = exports.getGameByPlayerId = exports.getGame = exports.createGame = void 0;
const types_1 = require("../types/types");
const resLog_1 = __importDefault(require("../utils/resLog"));
const sendResponse_1 = __importStar(require("../utils/sendResponse"));
const clients_1 = require("./clients");
const players_1 = require("./players");
const winners_1 = require("./winners");
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
    const game = games.find((game) => game.id === gameId);
    return game;
};
exports.getGame = getGame;
const getGameByPlayerId = (playerId) => {
    const game = games.find((game) => game.playersData[0]?.indexPlayer === playerId ||
        game.playersData[1]?.indexPlayer === playerId);
    return game;
};
exports.getGameByPlayerId = getGameByPlayerId;
const addPlayerToGame = (playerGameData) => {
    const targetGame = (0, exports.getGame)(playerGameData.gameId);
    if (targetGame) {
        const gamePlayer = {
            ...playerGameData,
            checkedCells: [],
        };
        targetGame.playersData.push(gamePlayer);
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
    const gamePlayers = (0, exports.getGamePlayers)(gameId);
    const gamePlayer = gamePlayers?.find((player) => player.indexPlayer === gamePlayerId);
    return gamePlayer;
};
exports.getGamePlayer = getGamePlayer;
const getGameEnemy = (gameId, gamePlayerId) => {
    const gamePlayers = (0, exports.getGamePlayers)(gameId);
    const gameEnemy = gamePlayers?.find((player) => player.indexPlayer !== gamePlayerId);
    return gameEnemy;
};
exports.getGameEnemy = getGameEnemy;
const deleteGame = (gameId) => {
    games = games.filter((game) => game.id !== gameId);
};
exports.deleteGame = deleteGame;
const finishGame = (winnerId, enemyId, gameId, gameAborted) => {
    const winnerPlayer = (0, players_1.getPlayer)(winnerId);
    const winnerSocket = (0, clients_1.getClient)(winnerId);
    const finishResData = {
        winPlayer: winnerId,
    };
    const finishRes = {
        type: types_1.ResMessage.FINISH,
        id: 0,
        data: JSON.stringify(finishResData),
    };
    (0, winners_1.updateWinner)(winnerId);
    const winners = (0, winners_1.getWinners)();
    const updateWinnersRes = {
        type: types_1.ResMessage.UPDATE_WINNERS,
        id: 0,
        data: JSON.stringify(winners),
    };
    if (gameAborted) {
        const whoCancelled = (0, players_1.getPlayer)(enemyId);
        console.log(`Game was canceled by ${whoCancelled?.name}`);
        (0, sendResponse_1.default)(finishRes, winnerSocket);
    }
    else {
        (0, sendResponse_1.sendResponseToChosen)(finishRes, [winnerId, enemyId]);
    }
    (0, resLog_1.default)('Game is finished');
    (0, resLog_1.default)(`${winnerPlayer?.name} is the winner!`);
    (0, resLog_1.default)(types_1.ResMessage.UPDATE_WINNERS);
    (0, sendResponse_1.sendResponseToAll)(updateWinnersRes);
    (0, exports.deleteGame)(gameId);
};
exports.finishGame = finishGame;
//# sourceMappingURL=games.js.map