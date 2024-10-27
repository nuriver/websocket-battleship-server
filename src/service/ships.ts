import {
  PlayerGameData,
  ShipField,
  ShipFieldCell,
  ShipTracker,
} from '../types/dataTypes';
import { getGamePlayer } from './games';

export const createShipField = (playerGameData: PlayerGameData) => {
  const field: ShipFieldCell[][] = Array.from({ length: 10 }, () =>
    Array(10).fill(null)
  );
  const shipTracker: ShipTracker = {};
  const ships = playerGameData.ships;

  ships.forEach((ship, index) => {
    const id = `ship${index}`;
    shipTracker[id] = ship.length;
    const startX = ship.position.x;
    const startY = ship.position.y;
    const isHorizontal = ship.direction;

    for (let i = 0; i < ship.length; i += 1) {
      const x = isHorizontal ? startX : startX + i;
      const y = isHorizontal ? startY + i : startY;

      if (field[x]) {
        field[x][y] = id;
      }
    }
  });
  const shipField = {
    field,
    shipTracker,
  };

  console.log(shipField);
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
