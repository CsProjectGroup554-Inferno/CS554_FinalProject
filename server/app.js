const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});
io.use((socket, next) => {
  const username = socket.handshake.auth.dd;
  socket.username = username;
  next();
});
io.on("connection", (socket) => {
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
      key: id,
    });
  }
  socket.emit("users", users);
  console.log(users);

  socket.broadcast.emit("user connected", {
    userID: socket.id,
    username: socket.username,
    key: socket.id,
    self: false,
  });

  socket.on("private message", ({ content, to }) => {
    console.log("Content:", content, " To:", to);
    socket.to(to).emit("private message", {
      content,
      from: socket.id,
    });
  });
});


app.use(express.json())

app.use(cors());
const configRoutes = require("./routes/index");
configRoutes(app);

http.listen(4000, () => {
  console.log("Listening on port 4000");
});
// app.listen(4000, () => {
//   console.log("Server is running on port 4000");
// });
