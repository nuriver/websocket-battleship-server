import WebSocket from 'ws';
import { addRoom, getRooms, userHasRoom } from '../../service/rooms';
import { getPlayer, getPlayers } from '../../service/players';
import { Room } from '../../types/dataTypes';
import { ResMessage } from '../../types/types';
import sendResponse from '../../utils/sendResponse';

const createRoomHandler = (ws: WebSocket, id: number) => {
  if (userHasRoom(id) === true) {
    return;
  }

  const user = getPlayer(id);
  const rooms = getRooms();
  const room: Room = {
    roomId: id,
    roomUsers: user ? [user] : [],
  };
  addRoom(room);
  const updatedRooms = getRooms();

  const updateRoomRes = {
    id: 0,
    data: JSON.stringify(updatedRooms),
    type: ResMessage.UPDATE_ROOM,
  };

  sendResponse(updateRoomRes, ws);
};

export default createRoomHandler;
