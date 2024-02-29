// const { Server } = require("socket.io");

import { Server } from "socket.io";

const SocketHandler = async (req, res) => {
  if (res.socket.server.io) {
    console.log("Socket is running");
  } else {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
    io.on("connect", (socket) => {
      //   console.log("User Connected", socket.id);
      // socket.on("join-room", (roomId, Id) => {
      //   socket.join(roomId);
      //   // console.log(roomId);
      //   // console.log("room ko", roomId);
      //   socket.broadcast.to(roomId).emit("user-connected", Id);
      // });
      socket.on("join-room", (roomId, Id) => {
        socket.join(roomId); // This line joins the socket to the specified room
        socket.broadcast.to(roomId).emit("user-connected", Id); // This emits an event to all other sockets in the room
      });
    });
  }
  res.end();
};

export default SocketHandler;
