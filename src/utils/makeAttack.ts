import { Position, ShipField, ShipFieldCell } from '../types/dataTypes';

const isWithinBounds = (x: number, y: number): boolean =>
  x >= 0 && x < 10 && y >= 0 && y < 10;

const getSurroundingCells = (positions: Position[]): Position[] => {
  const surroundingCells = new Set<string>();

  positions.forEach(({ x, y }) => {
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const nx = x + dx;
        const ny = y + dy;
        if (
          isWithinBounds(nx, ny) &&
          !positions.some((cell) => cell.x === nx && cell.y === ny)
        ) {
          surroundingCells.add(`${nx},${ny}`);
        }
      }
    }
  });

  return Array.from(surroundingCells).map((cell) => {
    const [parsedX, parsedY] = cell.split(',').map(Number);

    const x = parsedX !== undefined ? parsedX : 0;
    const y = parsedY !== undefined ? parsedY : 0;

    return { x, y };
  });
};

const makeAttack = (
  x: number,
  y: number,
  enemyShipField: ShipField
): { result: string; surroundingCells?: Position[] } => {
  const field = enemyShipField.field;
  let result: string = 'miss';
  let surroundingCells: Position[] | undefined;

  if (field[x]) {
    const cell = field[x]![y];

    if (cell === null) {
      result = 'miss';
    } else if (cell !== undefined) {
      enemyShipField.shipTracker[cell]!--;

      if (enemyShipField.shipTracker[cell] === 0) {
        result = 'killed';

        const shipPositions = enemyShipField.shipPositions[cell]!;

        surroundingCells = getSurroundingCells(shipPositions);
      } else {
        result = 'shot';
      }
    }
  }

  return { result, surroundingCells };
};

export default makeAttack;
