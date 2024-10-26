"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoom = exports.addUserToRoom = exports.userHasRoom = exports.getRooms = exports.addRoom = void 0;
const players_1 = require("./players");
let rooms = [];
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
const addUserToRoom = (roomIndex, userId) => {
    const targetRoom = rooms.find((room) => room.roomId === roomIndex);
    const user = (0, players_1.getPlayer)(userId);
    if (targetRoom && user) {
        targetRoom?.roomUsers.push(user);
        (0, exports.deleteRoom)(roomIndex);
        (0, exports.deleteRoom)(userId);
    }
};
exports.addUserToRoom = addUserToRoom;
const deleteRoom = (roomIndex) => {
    rooms = rooms.filter((room) => room.roomId !== roomIndex);
};
exports.deleteRoom = deleteRoom;
//# sourceMappingURL=rooms.js.map