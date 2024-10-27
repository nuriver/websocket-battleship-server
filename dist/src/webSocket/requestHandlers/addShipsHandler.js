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
Object.defineProperty(exports, "__esModule", { value: true });
const clients_1 = require("../../service/clients");
const games_1 = require("../../service/games");
const types_1 = require("../../types/types");
const sendResponse_1 = __importStar(require("../../utils/sendResponse"));
const addShipsHandler = (message) => {
    const data = JSON.parse(message.data);
    (0, games_1.addPlayerToGame)(data);
    if ((0, games_1.gameCanStart)(data.gameId)) {
        const game = (0, games_1.getGame)(data.gameId);
        const playerData1 = game?.playersData[0];
        const playerData2 = game?.playersData[1];
        const starGameResForPlayer1 = {
            type: types_1.ResMessage.START_GAME,
            data: JSON.stringify({
                ships: playerData1?.ships,
                currentIndexPlayer: playerData1?.indexPlayer,
            }),
            id: 0,
        };
        const starGameResForPlayer2 = {
            type: types_1.ResMessage.START_GAME,
            data: JSON.stringify({
                ships: playerData2?.ships,
                currentIndexPlayer: playerData2?.indexPlayer,
            }),
            id: 0,
        };
        const turnRes = {
            type: types_1.ResMessage.TURN,
            id: 0,
            data: JSON.stringify({
                currentPlayer: playerData1?.indexPlayer,
            }),
        };
        const playerSocket1 = (0, clients_1.getClient)(playerData1?.indexPlayer);
        const playerSocket2 = (0, clients_1.getClient)(playerData2?.indexPlayer);
        (0, sendResponse_1.default)(starGameResForPlayer1, playerSocket1);
        (0, sendResponse_1.default)(starGameResForPlayer2, playerSocket2);
        (0, sendResponse_1.sendResponseToChosen)(turnRes, [
            playerData1?.indexPlayer,
            playerData2?.indexPlayer,
        ]);
    }
};
exports.default = addShipsHandler;
//# sourceMappingURL=addShipsHandler.js.map