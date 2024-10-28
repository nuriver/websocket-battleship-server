import WebSocket from 'ws';
import { setPlayerOffline } from './players';
import { deleteRoom } from './rooms';
import roomsUpdateNotifier from '../utils/roomsUpdateNotifier';

const clients = new Map();

export const addClient = (clientId: number, ws: WebSocket) => {
  clients.set(clientId, ws);
};

export const deleteClient = (clientId: number) => {
  clients.delete(clientId);
  setPlayerOffline(clientId);
  deleteRoom(clientId);
  roomsUpdateNotifier();
};

export const getClients = () => {
  return clients;
};

export const getClient = (clientId: number) => {
  const ws = clients.get(clientId);
  return ws;
};
