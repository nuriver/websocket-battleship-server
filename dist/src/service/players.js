"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPlayer = void 0;
const players = [];
const addPlayer = (credentials) => {
    players.push(credentials);
    const playerIndex = players.indexOf(credentials);
    return playerIndex;
};
exports.addPlayer = addPlayer;
//# sourceMappingURL=players.js.map