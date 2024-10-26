"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rooms_1 = require("../service/rooms");
const types_1 = require("../types/types");
const sendResponse_1 = require("./sendResponse");
const roomsUpdateNotifier = () => {
    const rooms = (0, rooms_1.getRooms)();
    const updateRoomRes = {
        type: types_1.ResMessage.UPDATE_ROOM,
        id: 0,
        data: JSON.stringify(rooms),
    };
    (0, sendResponse_1.sendResponseToAll)(updateRoomRes);
};
exports.default = roomsUpdateNotifier;
//# sourceMappingURL=roomsUpdateNotifier.js.map