"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRooms = exports.addRoom = void 0;
const rooms = [];
const addRoom = (room) => {
    rooms.push(room);
};
exports.addRoom = addRoom;
const getRooms = () => {
    return rooms;
};
exports.getRooms = getRooms;
//# sourceMappingURL=rooms.js.map