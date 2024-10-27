"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isWithinBounds = (x, y) => x >= 0 && x < 10 && y >= 0 && y < 10;
const getSurroundingCells = (positions) => {
    const surroundingCells = new Set();
    positions.forEach(({ x, y }) => {
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                const nx = x + dx;
                const ny = y + dy;
                if (isWithinBounds(nx, ny) &&
                    !positions.some((cell) => cell.x === nx && cell.y === ny)) {
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
const makeAttack = (x, y, enemyShipField) => {
    const field = enemyShipField.field;
    let result = 'miss';
    let surroundingCells;
    if (field[x]) {
        const cell = field[x][y];
        if (cell === null) {
            result = 'miss';
        }
        else if (cell !== undefined) {
            enemyShipField.shipTracker[cell]--;
            if (enemyShipField.shipTracker[cell] === 0) {
                result = 'killed';
                const shipPositions = enemyShipField.shipPositions[cell];
                surroundingCells = getSurroundingCells(shipPositions);
            }
            else {
                result = 'shot';
            }
        }
    }
    return { result, surroundingCells };
};
exports.default = makeAttack;
//# sourceMappingURL=makeAttack.js.map