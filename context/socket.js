import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const connect = io();
    // console.log(connect);
    setSocket(connect);
  }, []);

  socket?.on("connect_error", async (err) => {
    console.log("Error establishing socket", err);
    await fetch("/api/socket");
  });

  return (
    <SocketContext.Provider value={socket}> {children} </SocketContext.Provider>
  );
};

export default SocketProvider;
