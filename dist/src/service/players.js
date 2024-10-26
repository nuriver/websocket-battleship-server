"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlayer = exports.getPlayers = exports.addPlayer = void 0;
const players = [];
const addPlayer = (credentials) => {
    players.push(credentials);
    const playerIndex = players.indexOf(credentials);
    return playerIndex;
};
exports.addPlayer = addPlayer;
const getPlayers = () => {
    return players;
};
exports.getPlayers = getPlayers;
const getPlayer = (id) => {
    const player = players.find((player) => player.index === id);
    return player;
};
exports.getPlayer = getPlayer;
//# sourceMappingURL=players.js.map