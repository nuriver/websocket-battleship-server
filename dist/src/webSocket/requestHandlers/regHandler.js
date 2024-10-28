"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../types/types");
const players_1 = require("../../service/players");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const winners_1 = require("../../service/winners");
const roomsUpdateNotifier_1 = __importDefault(require("../../utils/roomsUpdateNotifier"));
const resLog_1 = __importDefault(require("../../utils/resLog"));
const regHandler = (message, ws, clientId) => {
    const data = JSON.parse(message.data);
    const player = {
        name: data.name,
        index: clientId,
        password: data.password,
    };
    const players = (0, players_1.getPlayers)();
    const playerExist = players.some((player) => {
        return player.name === data.name;
    });
    const regResData = {
        name: data.name,
        index: clientId,
        error: playerExist ? true : false,
        errorText: playerExist
            ? `Player with name ${data.name} already logged in`
            : '',
    };
    const regRes = {
        id: 0,
        data: JSON.stringify(regResData),
        type: types_1.ResMessage.REG,
    };
    (0, sendResponse_1.default)(regRes, ws);
    if (!playerExist) {
        (0, players_1.addPlayer)(player);
        (0, resLog_1.default)(`User ${player.name} is logged in`);
        const winners = (0, winners_1.getWinners)();
        const updateWinnersRes = {
            type: types_1.ResMessage.UPDATE_WINNERS,
            id: 0,
            data: JSON.stringify(winners),
        };
        (0, resLog_1.default)(types_1.ResMessage.UPDATE_WINNERS);
        (0, sendResponse_1.default)(updateWinnersRes, ws);
        (0, resLog_1.default)(types_1.ResMessage.UPDATE_ROOM);
        (0, roomsUpdateNotifier_1.default)();
    }
    else {
        (0, resLog_1.default)(`User with name ${data.name} is already logged in`);
    }
};
exports.default = regHandler;
//# sourceMappingURL=regHandler.js.map