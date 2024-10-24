import { httpServer, openBrowser } from './src/http_server/index';

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);

httpServer.listen(HTTP_PORT, () => {
  const url = `http://localhost:${HTTP_PORT}`;
  console.log(`Server is running at ${url}`);

  openBrowser(url);
});