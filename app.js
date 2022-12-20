const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const socket = require("socket.io");
require("dotenv").config();

const http = require("http").createServer(app);

app.use(cors());
// Configure Rounte and express
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(express.static(path.join(__dirname, "client/build")));
const configRoutes = require("./routes/index");
configRoutes(app);
app.get("/api/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const port = process.env.PORT || 4000;
const server = http.listen(port, () => {
  console.log("Listening on port 4000");
});

// Configure socket.io
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
