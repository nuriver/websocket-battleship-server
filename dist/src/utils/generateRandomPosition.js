"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ships_1 = require("../service/ships");
const generateRandomPosition = (checkedCells) => {
    let position;
    do {
        position = {
            x: Math.floor(Math.random() * 10),
            y: Math.floor(Math.random() * 10),
        };
    } while ((0, ships_1.isChecked)(position, checkedCells));
    return position;
};
exports.default = generateRandomPosition;
//# sourceMappingURL=generateRandomPosition.js.map