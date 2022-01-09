const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  console.log(`user ${socket.id} has joined`);
  socket.on("join", (data) => {
    socket.join(data.room);
    console.log(`User with ID: ${socket.id} joined room: ${data.room}`);
    socket.emit("message", {
      sender: "admin",
      message: `${data.name}, welcome to  ${data.room} !!.`,
    });
    socket.broadcast.to(data.room).emit("message", {
      sender: "admin",
      message: `${data.name} has joined!`,
    });
  });
  socket.on("sendMessage", (data) => {
    socket.to(data.room).emit("receiveMmessage", data);
  });
  socket.on("disconnect", () => {
    console.log(`user ${socket.id} has left`);
  });
});
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is up  on port ${PORT}`);
});
