"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./src/http_server/index");
const HTTP_PORT = 3000;
const url = `http://localhost:${HTTP_PORT}`;
console.log(`Start static http server on the ${HTTP_PORT} port!`);
index_1.httpServer.listen(HTTP_PORT, () => {
    console.log(`Server is running at ${url}`);
    (0, index_1.openBrowser)(url);
});
const socket = new WebSocket(`ws://localhost:${HTTP_PORT}`);
socket.onopen = function () {
    console.log('Open');
};
//# sourceMappingURL=index.js.map