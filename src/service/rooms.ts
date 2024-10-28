import { Room } from '../types/dataTypes';
import { getPlayer } from './players';

let rooms: Room[] = [];

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

export const addUserToRoom = (roomIndex: number, userId: number) => {
  const targetRoom = rooms.find((room) => room.roomId === roomIndex);
  const user = getPlayer(userId);
  if (targetRoom && user) {
    targetRoom?.roomUsers.push(user);
    deleteRoom(roomIndex);
    deleteRoom(userId);
  }
};

export const deleteRoom = (roomIndex: number) => {
  rooms = rooms.filter((room) => room.roomId !== roomIndex);
};
