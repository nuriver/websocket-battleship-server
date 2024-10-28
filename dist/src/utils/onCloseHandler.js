"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clients_1 = require("../service/clients");
const games_1 = require("../service/games");
const players_1 = require("../service/players");
const rooms_1 = require("../service/rooms");
const roomsUpdateNotifier_1 = __importDefault(require("./roomsUpdateNotifier"));
const onCloseHandler = (clientId) => {
    const game = (0, games_1.getGameByPlayerId)(clientId);
    const playerOneShips = game?.playersData[0]?.ships;
    const playerTwoShips = game?.playersData[1]?.ships;
    (0, clients_1.deleteClient)(clientId);
    (0, players_1.setPlayerOffline)(clientId);
    (0, rooms_1.deleteRoom)(clientId);
    (0, roomsUpdateNotifier_1.default)();
    if (game && playerOneShips?.length !== 0 && playerTwoShips?.length !== 0) {
        const enemy = (0, games_1.getGameEnemy)(game.id, clientId);
        (0, games_1.finishGame)(enemy?.indexPlayer, clientId, game.id, true);
    }
};
exports.default = onCloseHandler;
//# sourceMappingURL=onCloseHandler.js.map