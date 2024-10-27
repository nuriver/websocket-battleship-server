import {
  PlayerGameData,
  Position,
  ShipField,
  ShipFieldCell,
  shipPositions,
  ShipTracker,
} from '../types/dataTypes';
import isEqual from '../utils/isEqual';
import { getGamePlayer } from './games';

export const createShipField = (playerGameData: PlayerGameData) => {
  const field: ShipFieldCell[][] = Array.from({ length: 10 }, () =>
    Array(10).fill(null)
  );
  const shipTracker: ShipTracker = {};
  const shipPositions: shipPositions = {};
  const ships = playerGameData.ships;

  ships.forEach((ship, index) => {
    const id = `ship${index}`;
    shipTracker[id] = ship.length;
    const startX = ship.position.x;
    const startY = ship.position.y;
    const isHorizontal = ship.direction;

    shipPositions[id] = [];

    for (let i = 0; i < ship.length; i += 1) {
      const x = isHorizontal ? startX : startX + i;
      const y = isHorizontal ? startY + i : startY;

      if (field[x]) {
        field[x][y] = id;
        shipPositions[id].push({ x, y });
      }
    }
  });

  const shipField = {
    field,
    shipTracker,
    shipPositions,
  };

  addShipField(
    playerGameData.gameId,
    playerGameData.indexPlayer as number,
    shipField
  );
};

export const addShipField = (
  gameId: number,
  gamePlayerId: number,
  shipField: ShipField
) => {
  const gamePlayer = getGamePlayer(gameId, gamePlayerId);
  if (gamePlayer) {
    gamePlayer.shipField = shipField;
  }
};

export const isChecked = (
  attackPosition: Position,
  checkedPositions?: Position[]
) => {
  let checked = false;

  if (!checkedPositions) {
    return checked;
  }

  checked = checkedPositions.some((position) =>
    isEqual(position, attackPosition)
  );
  return checked;
};
