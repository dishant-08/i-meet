// const { Server } = require("socket.io");

// import { useChat } from "@/context/chat";
import { Server } from "socket.io";

const SocketHandler = async (req, res) => {
  // const { chat, addtoChat } = useChat();
  // const arraychat = [];
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
      socket.on("join-room", (roomId, Id, input) => {
        socket.join(roomId); // This line joins the socket to the specified room
        socket.broadcast.to(roomId).emit("user-connected", Id, input); // This emits an event to all other sockets in the room
      });
      // socket?.emit("live-chat", name, input);
      // socket.on("live-chat", (name, input) => {
      //   // addtoChat(name, input);
      //   arraychat.push({ name, input });
      //   io.emit("receive-chat", arraychat);
      //   // console.log("dwkndkwd");
      // });
      socket.on("live-chat", (roomId, name, input) => {
        console.log(roomId);
        // Emit the received chat message to all connected clients in the same room
        io.to(roomId).emit("receive-chat", { name, input });
      });
      socket.on("toggle-video", (roomId, userId) => {
        socket.join(roomId); // This line joins the socket to the specified room
        socket.broadcast.to(roomId).emit("user-toggle-video", userId);
      });
      socket.on("toggle-audio", (roomId, userId) => {
        socket.join(roomId); // This line joins the socket to the specified room
        socket.broadcast.to(roomId).emit("user-toggle-audio", userId);
      });
    });
  }
  res.end();
};

export default SocketHandler;
