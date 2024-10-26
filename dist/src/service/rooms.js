"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userHasRoom = exports.getRooms = exports.addRoom = void 0;
const rooms = [];
const addRoom = (room) => {
    rooms.push(room);
};
exports.addRoom = addRoom;
const getRooms = () => {
    return rooms;
};
exports.getRooms = getRooms;
const userHasRoom = (id) => {
    const doubleRoom = rooms.filter((room) => {
        return room.roomId === id;
    });
    if (doubleRoom.length > 0) {
        return true;
    }
    else {
        return false;
    }
};
exports.userHasRoom = userHasRoom;
//# sourceMappingURL=rooms.js.map