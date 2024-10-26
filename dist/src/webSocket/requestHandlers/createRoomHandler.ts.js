"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rooms_1 = require("../../service/rooms");
const players_1 = require("../../service/players");
const roomsUpdateNotifier_1 = __importDefault(require("../../utils/roomsUpdateNotifier"));
const createRoomHandler = (ws, id) => {
    if ((0, rooms_1.userHasRoom)(id) === true) {
        return;
    }
    const user = (0, players_1.getPlayer)(id);
    const room = {
        roomId: id,
        roomUsers: user ? [user] : [],
    };
    (0, rooms_1.addRoom)(room);
    (0, roomsUpdateNotifier_1.default)();
};
exports.default = createRoomHandler;
//# sourceMappingURL=createRoomHandler.ts.js.map