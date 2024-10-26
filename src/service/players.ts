import { Player } from '../types/dataTypes';

const players: Player[] = [];

export const addPlayer = (credentials: Player) => {
  players.push(credentials);
  const playerIndex = players.indexOf(credentials);
  return playerIndex;
};
