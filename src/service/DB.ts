import { LoginReq } from '../types/dataTypes';

const players: LoginReq[] = [];

export const addPlayer = (credentials: LoginReq) => {
  players.push(credentials);
  const playerIndex = players.indexOf(credentials);
  return playerIndex;
};
