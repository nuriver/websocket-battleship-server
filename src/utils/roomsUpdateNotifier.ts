import { getRooms } from '../service/rooms';
import { Message, ResMessage } from '../types/types';
import { sendResponseToAll } from './sendResponse';

const roomsUpdateNotifier = () => {
  const rooms = getRooms();
  const updateRoomRes = {
    type: ResMessage.UPDATE_ROOM,
    id: 0,
    data: JSON.stringify(rooms),
  };

  sendResponseToAll(updateRoomRes);
};

export default roomsUpdateNotifier;
