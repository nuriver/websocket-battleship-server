import { Winner } from '../types/dataTypes';
import { getPlayer } from './players';

const winners: Winner[] = [];

const getWinner = (winnerId: number): Winner | undefined => {
  const player = getPlayer(winnerId);
  const winners = getWinners();
  const winner = winners.find((winner) => player?.name === winner.name);
  return winner;
};

export const getWinners = () => {
  return winners;
};

export const updateWinner = (winnerId: number) => {
  const winner = getWinner(winnerId);
  if (!winner) {
    createWinner(winnerId);
  } else {
    winner.wins += 1;
  }
};

const createWinner = (winnerId: number) => {
  const player = getPlayer(winnerId);
  if (player) {
    const winner = {
      name: player.name,
      wins: 1,
    };
    winners.push(winner);
  }
};
