"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rooms_1 = require("../../service/rooms");
const players_1 = require("../../service/players");
const roomsUpdateNotifier_1 = __importDefault(require("../../utils/roomsUpdateNotifier"));
const resLog_1 = __importDefault(require("../../utils/resLog"));
const types_1 = require("../../types/types");
const createRoomHandler = (id) => {
    const user = (0, players_1.getPlayer)(id);
    const room = {
        roomId: id,
        roomUsers: user ? [user] : [],
    };
    if ((0, rooms_1.userHasRoom)(id) === true) {
        (0, resLog_1.default)(`User ${user?.name} already has room`);
        return;
    }
    (0, rooms_1.addRoom)(room);
    (0, resLog_1.default)(`Room for user ${user?.name} is created`);
    (0, resLog_1.default)(`User ${user?.name} is added to the room`);
    (0, resLog_1.default)(types_1.ResMessage.UPDATE_ROOM);
    (0, roomsUpdateNotifier_1.default)();
};
exports.default = createRoomHandler;
//# sourceMappingURL=createRoomHandler.ts.js.map