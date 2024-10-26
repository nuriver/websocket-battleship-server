"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rooms_1 = require("../../service/rooms");
const roomsUpdateNotifier_1 = __importDefault(require("../../utils/roomsUpdateNotifier"));
const addUserToRoomHandler = (message, clientId, ws) => {
    const data = JSON.parse(message.data);
    const roomId = data.indexRoom;
    (0, rooms_1.addUserToRoom)(roomId, clientId);
    (0, roomsUpdateNotifier_1.default)();
};
exports.default = addUserToRoomHandler;
//# sourceMappingURL=addUserToRoomHandler.js.map