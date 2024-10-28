"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isChecked = exports.addShipField = exports.createShipField = void 0;
const isEqual_1 = __importDefault(require("../utils/isEqual"));
const games_1 = require("./games");
const createShipField = (playerGameData) => {
    const field = Array.from({ length: 10 }, () => Array(10).fill(null));
    const shipTracker = {};
    const shipPositions = {};
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
const isChecked = (attackPosition, checkedPositions) => {
    let checked = false;
    if (!checkedPositions) {
        return checked;
    }
    checked = checkedPositions.some((position) => (0, isEqual_1.default)(position, attackPosition));
    return checked;
};
exports.isChecked = isChecked;
//# sourceMappingURL=ships.js.map