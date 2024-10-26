"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../types/types");
const players_1 = require("../../service/players");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const winners_1 = require("../../service/winners");
const rooms_1 = require("../../service/rooms");
const regHandler = (message, ws, clientId) => {
    const data = JSON.parse(message.data);
    const player = {
        name: data.name,
        index: clientId,
        password: data.password
    };
    const players = (0, players_1.getPlayers)();
    const playerExist = players.some((player) => {
        return player.name === data.name;
    });
    console.log(playerExist);
    const loginRes = {
        name: data.name,
        index: clientId,
        error: playerExist ? true : false,
        errorText: playerExist ? `Player with name ${data.name} already logged in` : ''
    };
    (0, players_1.addPlayer)(player);
    (console.log((0, players_1.getPlayers)()));
    const regRes = {
        id: 0,
        data: JSON.stringify(loginRes),
        type: types_1.ResMessage.REG,
    };
    (0, sendResponse_1.default)(regRes, ws);
    const winners = (0, winners_1.getWinners)();
    const updateWinnersRes = {
        type: types_1.ResMessage.UPDATE_WINNERS,
        id: 0,
        data: JSON.stringify(winners),
    };
    (0, sendResponse_1.default)(updateWinnersRes, ws);
    const rooms = (0, rooms_1.getRooms)();
    const updateRoomRes = {
        type: types_1.ResMessage.UPDATE_ROOM,
        id: 0,
        data: JSON.stringify(rooms),
    };
    (0, sendResponse_1.default)(updateRoomRes, ws);
};
exports.default = regHandler;
//# sourceMappingURL=regHandler.js.map