import WebSocket from 'ws';
import { Message, ResMessage } from '../../types/types';
import { addUserToRoom, getRooms } from '../../service/rooms';
import sendResponse, { sendResponseToAll } from '../../utils/sendResponse';
import roomsUpdateNotifier from '../../utils/roomsUpdateNotifier';

const addUserToRoomHandler = (
  message: Message,
  clientId: number,
  ws: WebSocket
) => {
  const data = JSON.parse(message.data as string);
  const roomId = data.indexRoom;
  addUserToRoom(roomId, clientId);
  roomsUpdateNotifier();
};

export default addUserToRoomHandler;
