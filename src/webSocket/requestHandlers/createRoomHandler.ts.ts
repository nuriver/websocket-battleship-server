import { addRoom, userHasRoom } from '../../service/rooms';
import { getPlayer } from '../../service/players';
import { Room } from '../../types/dataTypes';
import roomsUpdateNotifier from '../../utils/roomsUpdateNotifier';
import resLog from '../../utils/resLog';
import { ResMessage } from '../../types/types';

const createRoomHandler = (id: number) => {
  const user = getPlayer(id);
  const room: Room = {
    roomId: id,
    roomUsers: user ? [user] : [],
  };

  if (userHasRoom(id) === true) {
    resLog(`User ${user?.name} already has room`);
    return;
  }

  addRoom(room);

  resLog(`Room for user ${user?.name} is created`);
  resLog(`User ${user?.name} is added to the room`);
  resLog(ResMessage.UPDATE_ROOM);
  roomsUpdateNotifier();
};

export default createRoomHandler;
