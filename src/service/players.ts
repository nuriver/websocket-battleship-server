import { Player } from '../types/dataTypes';

let players: Player[] = [];

export const addPlayer = (credentials: Player) => {
  players.push(credentials);
  const playerIndex = players.indexOf(credentials);
  return playerIndex;
};

export const getPlayers = () => {
  return players;
};

export const getPlayer = (id: number) => {
  const player = players.find((player) => player.index === id);

  return player;
};

export const deletePlayer = (id: number) => {
  players = players.filter((player) => player.index !== id);
};
