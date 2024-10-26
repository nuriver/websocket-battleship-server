import { Room } from '../types/dataTypes';

const rooms: Room[] = [];

export const addRoom = (room: Room) => {
  rooms.push(room);
};

export const getRooms = () => {
  return rooms;
};
