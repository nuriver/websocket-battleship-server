"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (message, ws) => {
    ws.send(JSON.stringify(message));
    console.log(`Result: ${message.type}`);
};
exports.default = sendResponse;
//# sourceMappingURL=sendResponse.js.map