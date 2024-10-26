import { Winner } from '../types/dataTypes';

const winners: Winner[] = [];

export const addWinner = (winner: Winner) => {
  winners.push(winner);
};

export const getWinners = () => {
  return winners;
};
