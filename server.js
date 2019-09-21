const http = require("http");

const port = process.env.PORT || 3000;

const app = require("./src/App");

const server = http.createServer(app);
const io = require("socket.io").listen(server);

io.on("connection", socket => {
  socket.on("chat message", message => {
    io.emit("chat message", message);
  });
});

server.listen(port, () => console.log("Server is running on port " + port));
