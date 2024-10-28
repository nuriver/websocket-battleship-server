"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isPlayerExist = (players, name) => {
    const isExist = players.some((player) => {
        return player.name === name;
    });
    return isExist;
};
exports.default = isPlayerExist;
//# sourceMappingURL=playerExist.js.map