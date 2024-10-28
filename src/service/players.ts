import { Player } from '../types/dataTypes';

let players: Player[] = [];

export const addPlayer = (playerData: Player) => {
  players.push(playerData);
  const playerIndex = players.indexOf(playerData);
  return playerIndex;
};

export const getPlayers = () => {
  return players;
};

export const getPlayer = (id: number) => {
  const player = players.find((player) => player.index === id);

  return player;
};

export const getPlayerByName = (name: string) => {
  const player = players.find((player) => player.name === name);

  return player;
};

export const deletePlayer = (id: number) => {
  players = players.filter((player) => player.index !== id);
};

export const setPlayerOffline = (id: number) => {
  const player = getPlayer(id);
  if (player) {
    player.status = 'offline';
  }
};
