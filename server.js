const http = require("http");

const port = process.env.PORT || 3000;

const app = require("./src/App");

const server = http.createServer(app);

server.listen(port);
