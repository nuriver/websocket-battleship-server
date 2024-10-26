"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../types/types");
const rooms_1 = require("../../service/rooms");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const roomsUpdateNotifier_1 = __importDefault(require("../../utils/roomsUpdateNotifier"));
const clients_1 = require("../../service/clients");
const addUserToRoomHandler = (message, clientId, ws) => {
    const data = JSON.parse(message.data);
    const roomId = data.indexRoom;
    if (clientId === roomId) {
        console.log("Result: User is already in the room");
        return;
    }
    (0, rooms_1.addUserToRoom)(roomId, clientId);
    const gameId = Date.now();
    const wsPlayer = (0, clients_1.getClient)(clientId);
    const wsEnemy = (0, clients_1.getClient)(roomId);
    const playerCreateGameRes = {
        id: 0,
        type: types_1.ResMessage.CREATE_GAME,
        data: JSON.stringify({
            idPlayer: clientId,
            idGame: gameId
        })
    };
    const enemyCreateGameRes = {
        ...playerCreateGameRes,
        data: JSON.stringify({
            idPlayer: roomId,
            idGame: gameId
        })
    };
    (0, sendResponse_1.default)(playerCreateGameRes, wsPlayer);
    (0, sendResponse_1.default)(enemyCreateGameRes, wsEnemy);
    (0, roomsUpdateNotifier_1.default)();
};
exports.default = addUserToRoomHandler;
//# sourceMappingURL=addUserToRoomHandler.js.map