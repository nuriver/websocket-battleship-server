import WebSocket from 'ws';
import { deletePlayer } from './players';

const clients = new Map();

export const addClient = (clientId: number, ws: WebSocket) => {
  clients.set(clientId, ws);
};

export const deleteClient = (clientId: number) => {
  clients.delete(clientId);
  deletePlayer(clientId);
};

export const getClients = () => {
  return clients;
};

export const getClient = (clientId: number) => {
  const ws = clients.get(clientId);
  return ws;
};
