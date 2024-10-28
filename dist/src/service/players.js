"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setPlayerOffline = exports.deletePlayer = exports.getPlayerByName = exports.getPlayer = exports.getPlayers = exports.addPlayer = void 0;
let players = [];
const addPlayer = (playerData) => {
    players.push(playerData);
    const playerIndex = players.indexOf(playerData);
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
const getPlayerByName = (name) => {
    const player = players.find((player) => player.name === name);
    return player;
};
exports.getPlayerByName = getPlayerByName;
const deletePlayer = (id) => {
    players = players.filter((player) => player.index !== id);
};
exports.deletePlayer = deletePlayer;
const setPlayerOffline = (id) => {
    const player = (0, exports.getPlayer)(id);
    if (player) {
        player.status = 'offline';
    }
};
exports.setPlayerOffline = setPlayerOffline;
//# sourceMappingURL=players.js.map