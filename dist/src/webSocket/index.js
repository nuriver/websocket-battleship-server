"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types/types");
const reqLog_1 = __importDefault(require("../utils/reqLog"));
const addShipsHandler_1 = __importDefault(require("./requestHandlers/addShipsHandler"));
const addUserToRoomHandler_1 = __importDefault(require("./requestHandlers/addUserToRoomHandler"));
const attackHandler_1 = __importDefault(require("./requestHandlers/attackHandler"));
const createRoomHandler_ts_1 = __importDefault(require("./requestHandlers/createRoomHandler.ts"));
const regHandler_1 = __importDefault(require("./requestHandlers/regHandler"));
const socketRequestHandler = (message, ws, clientId) => {
    if (message.type === types_1.ReqMessage.REG) {
        (0, reqLog_1.default)(message.type);
        (0, regHandler_1.default)(message, ws, clientId);
    }
    if (message.type === types_1.ReqMessage.CREATE_ROOM) {
        (0, reqLog_1.default)(message.type);
        (0, createRoomHandler_ts_1.default)(ws, clientId);
    }
    if (message.type === types_1.ReqMessage.ADD_USER_TO_ROOM) {
        (0, reqLog_1.default)(message.type);
        (0, addUserToRoomHandler_1.default)(message, clientId, ws);
    }
    if (message.type === types_1.ReqMessage.ADD_SHIPS) {
        (0, reqLog_1.default)(message.type);
        (0, addShipsHandler_1.default)(message);
    }
    if (message.type === types_1.ReqMessage.ATTACK) {
        (0, reqLog_1.default)(message.type);
        (0, attackHandler_1.default)(message);
    }
};
exports.default = socketRequestHandler;
//# sourceMappingURL=index.js.map