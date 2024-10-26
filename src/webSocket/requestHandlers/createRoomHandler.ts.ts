import WebSocket from 'ws';
import { addRoom, getRooms, userHasRoom } from '../../service/rooms';
import { getPlayer } from '../../service/players';
import { Room } from '../../types/dataTypes';
import roomsUpdateNotifier from '../../utils/roomsUpdateNotifier';

const createRoomHandler = (ws: WebSocket, id: number) => {
  if (userHasRoom(id) === true) {
    return;
  }

  const user = getPlayer(id);
  const room: Room = {
    roomId: id,
    roomUsers: user ? [user] : [],
  };

  addRoom(room);
  roomsUpdateNotifier();
};

export default createRoomHandler;
