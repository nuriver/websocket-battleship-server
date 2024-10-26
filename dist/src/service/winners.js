"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWinners = exports.addWinner = void 0;
const winners = [];
const addWinner = (winner) => {
    winners.push(winner);
};
exports.addWinner = addWinner;
const getWinners = () => {
    return winners;
};
exports.getWinners = getWinners;
//# sourceMappingURL=winners.js.map