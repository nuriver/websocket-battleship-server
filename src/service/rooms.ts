import { Room } from '../types/dataTypes';

const rooms: Room[] = [];

export const addRoom = (room: Room) => {
  rooms.push(room);
};

export const getRooms = () => {
  return rooms;
};

export const userHasRoom = (id: number) => {
  const doubleRoom = rooms.filter((room) => {
    return room.roomId === id;
  });

  if (doubleRoom.length > 0) {
    return true;
  } else {
    return false;
  }
};
