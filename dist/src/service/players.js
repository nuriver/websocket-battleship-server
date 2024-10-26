"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlayer = exports.getPlayer = exports.getPlayers = exports.addPlayer = void 0;
let players = [];
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
const deletePlayer = (id) => {
    players = players.filter((player) => player.index !== id);
};
exports.deletePlayer = deletePlayer;
//# sourceMappingURL=players.js.map