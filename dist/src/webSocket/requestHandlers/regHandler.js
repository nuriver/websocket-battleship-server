"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = require("../../service/DB");
const types_1 = require("../../types/types");
const regHandler = (data, ws) => {
    const index = (0, DB_1.addPlayer)(data);
    const loginRes = {
        name: data.name,
        index: index + 1,
        error: false,
        errorText: '',
    };
    const regResponse = JSON.stringify({
        id: 0,
        data: JSON.stringify(loginRes),
        type: types_1.ResMessage.REG,
    });
    ws.send(regResponse);
};
exports.default = regHandler;
//# sourceMappingURL=regHandler.js.map