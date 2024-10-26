"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rooms_1 = require("../../service/rooms");
const players_1 = require("../../service/players");
const types_1 = require("../../types/types");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const createRoomHandler = (ws, id) => {
    if ((0, rooms_1.userHasRoom)(id) === true) {
        return;
    }
    const user = (0, players_1.getPlayer)(id);
    const rooms = (0, rooms_1.getRooms)();
    const room = {
        roomId: id,
        roomUsers: user ? [user] : []
    };
    (0, rooms_1.addRoom)(room);
    const updatedRooms = (0, rooms_1.getRooms)();
    console.log(rooms, id);
    const updateRoomRes = {
        id: 0,
        data: JSON.stringify(updatedRooms),
        type: types_1.ResMessage.UPDATE_ROOM
    };
    (0, sendResponse_1.default)(updateRoomRes, ws);
};
exports.default = createRoomHandler;
//# sourceMappingURL=createRoomHandler.ts.js.map