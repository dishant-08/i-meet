import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useChat } from "@/context/chat";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

const SocketProvider = ({ children }) => {
  const { chat, addtoChat } = useChat();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const connect = io();
    // console.log(connect);
    const handleReceiveChat = (receivedName) => {
      console.log(receivedName);
      addtoChat(receivedName);

      // setChat([...arrChat, receivedName]);

      // Update the chat state using the addtoChat function
      //   addtoChat({
      //     name: receivedName,
      //     message: receivedMessage,
      //   });
    };

    // Attach the event listener when the component mounts
    connect?.on("receive-chat", handleReceiveChat);
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
