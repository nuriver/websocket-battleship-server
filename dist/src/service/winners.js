"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWinner = exports.getWinners = void 0;
const players_1 = require("./players");
const winners = [];
const getWinner = (winnerId) => {
    const player = (0, players_1.getPlayer)(winnerId);
    const winners = (0, exports.getWinners)();
    const winner = winners.find((winner) => player?.name === winner.name);
    return winner;
};
const getWinners = () => {
    return winners;
};
exports.getWinners = getWinners;
const updateWinner = (winnerId) => {
    const winner = getWinner(winnerId);
    if (!winner) {
        createWinner(winnerId);
    }
    else {
        winner.wins += 1;
    }
};
exports.updateWinner = updateWinner;
const createWinner = (winnerId) => {
    const player = (0, players_1.getPlayer)(winnerId);
    if (player) {
        const winner = {
            name: player.name,
            wins: 1,
        };
        winners.push(winner);
    }
};
//# sourceMappingURL=winners.js.map