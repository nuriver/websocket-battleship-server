"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addShipField = exports.createShipField = void 0;
const games_1 = require("./games");
const createShipField = (playerGameData) => {
    const field = Array.from({ length: 10 }, () => Array(10).fill(null));
    const shipTracker = {};
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
        shipTracker
    };
    console.log(shipField);
    (0, exports.addShipField)(playerGameData.gameId, playerGameData.indexPlayer, shipField);
};
exports.createShipField = createShipField;
const addShipField = (gameId, gamePlayerId, shipField) => {
    const gamePlayer = (0, games_1.getGamePlayer)(gameId, gamePlayerId);
    if (gamePlayer) {
        gamePlayer.shipField = shipField;
    }
};
exports.addShipField = addShipField;
//# sourceMappingURL=ships.js.map