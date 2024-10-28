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
const playerExist_1 = __importDefault(require("../../utils/playerExist"));
const regHandler = (message, ws, clientId) => {
    const data = JSON.parse(message.data);
    const players = (0, players_1.getPlayers)();
    const errorObject = {
        error: false,
        errorText: '',
    };
    const playerExist = (0, playerExist_1.default)(players, data.name);
    if (playerExist) {
        const player = (0, players_1.getPlayerByName)(data.name);
        if (player.status === 'online') {
            errorObject.error = true;
            errorObject.errorText = `Player with name ${data.name} already logged in`;
            (0, resLog_1.default)(errorObject.errorText);
        }
        if (player.status === 'offline') {
            const isValidPassword = player.password === data.password;
            if (!isValidPassword) {
                errorObject.error = true;
                errorObject.errorText = `Invalid password for ${data.name}`;
                (0, resLog_1.default)(errorObject.errorText);
            }
            else {
                player.status = 'online';
                player.index = clientId;
            }
        }
    }
    const regResData = {
        name: data.name,
        index: clientId,
        ...errorObject,
    };
    const regRes = {
        id: 0,
        data: JSON.stringify(regResData),
        type: types_1.ResMessage.REG,
    };
    (0, sendResponse_1.default)(regRes, ws);
    if (errorObject.errorText) {
        (0, resLog_1.default)(errorObject.errorText);
    }
    if (!playerExist) {
        const player = {
            name: data.name,
            index: clientId,
            password: data.password,
            status: 'online'
        };
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
};
exports.default = regHandler;
//# sourceMappingURL=regHandler.js.map