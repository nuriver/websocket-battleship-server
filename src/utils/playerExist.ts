import { Player } from '../types/dataTypes';

const isPlayerExist = (players: Player[], name: string) => {
  const isExist = players.some((player) => {
    return player.name === name;
  });

  return isExist;
};

export default isPlayerExist;
