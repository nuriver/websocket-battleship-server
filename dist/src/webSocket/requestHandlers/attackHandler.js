"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const games_1 = require("../../service/games");
const ships_1 = require("../../service/ships");
const types_1 = require("../../types/types");
const generateRandomPosition_1 = __importDefault(require("../../utils/generateRandomPosition"));
const makeAttack_1 = __importDefault(require("../../utils/makeAttack"));
const sendResponse_1 = require("../../utils/sendResponse");
const attackHandler = (message) => {
    const data = JSON.parse(message.data);
    const game = (0, games_1.getGame)(data.gameId);
    if (game?.currentTurn !== data.indexPlayer) {
        return;
    }
    const enemy = (0, games_1.getGameEnemy)(data.gameId, data.indexPlayer);
    let position;
    if (message.type === types_1.ReqMessage.RANDOM_ATTACK) {
        position = (0, generateRandomPosition_1.default)(enemy?.checkedCells);
    }
    else {
        position = {
            x: data.x,
            y: data.y,
        };
    }
    const checked = (0, ships_1.isChecked)(position, enemy?.checkedCells);
    if (checked) {
        return;
    }
    let nextTurn = undefined;
    const attackRes = {
        type: types_1.ResMessage.ATTACK,
        id: 0,
    };
    if (enemy) {
        enemy.checkedCells.push(position);
        const { result, surroundingCells } = (0, makeAttack_1.default)(position.x, position.y, enemy.shipField);
        const attackData = {
            position,
            currentPlayer: data.indexPlayer,
            status: result,
        };
        const attackResMessage = {
            ...attackRes,
            data: JSON.stringify(attackData),
        };
        if (result === 'shot') {
            nextTurn = data.indexPlayer;
        }
        if (result === 'miss') {
            nextTurn = enemy.indexPlayer;
        }
        if (result === 'killed') {
            nextTurn = data.indexPlayer;
            surroundingCells?.forEach((cell) => {
                enemy.checkedCells.push(cell);
                const killedAttackSurroundData = {
                    ...attackData,
                    position: cell,
                    status: 'miss',
                };
                const killedAttackSurroundRes = {
                    ...attackRes,
                    data: JSON.stringify(killedAttackSurroundData),
                };
                (0, sendResponse_1.sendResponseToChosen)(killedAttackSurroundRes, [
                    data.indexPlayer,
                    enemy.indexPlayer,
                ]);
            });
        }
        const turnRes = {
            type: types_1.ResMessage.TURN,
            id: 0,
            data: JSON.stringify({
                currentPlayer: nextTurn,
            }),
        };
        (0, sendResponse_1.sendResponseToChosen)(attackResMessage, [
            data.indexPlayer,
            enemy.indexPlayer,
        ]);
        (0, sendResponse_1.sendResponseToChosen)(turnRes, [data.indexPlayer, enemy.indexPlayer]);
        game.currentTurn = nextTurn;
    }
};
exports.default = attackHandler;
//# sourceMappingURL=attackHandler.js.map