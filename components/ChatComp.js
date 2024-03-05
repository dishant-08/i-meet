import { useChat } from "@/context/chat";
import { useSocket } from "@/context/socket";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ChatComp = (name) => {
  const { chat, addtoChat } = useChat();
  const { roomId } = useRouter().query;
  // const {  } = useRouter().query;
  const [input, setInput] = useState("");
  const socket = useSocket();
  const [arrChat, setChat] = useState([]);

  useEffect(() => {
    const handleReceiveChat = (receivedName) => {
      console.log(receivedName);
      // setChat([...arrChat, receivedName]);

      // Update the chat state using the addtoChat function
      //   addtoChat({
      //     name: receivedName,
      //     message: receivedMessage,
      //   });
    };

    // Attach the event listener when the component mounts
    socket?.on("receive-chat", handleReceiveChat);

    // Detach the event listener when the component unmounts
    // return () => {
    //   socket?.off("receive-chat", handleReceiveChat);
    // };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    // Emit the live-chat event with the name and input
    socket?.emit("live-chat", roomId, name, input);
    // setChat([...arrChat, { name, input }]);
    // Clear the input field
    setInput("");
  };

  console.log(chat);

  console.log(roomId);
  // console.log(Object.keys(socket.rooms));

  return (
    <div className="absolute right-0 flex flex-col bg-slate-400 h-screen w-1/5">
      <div className="border-2 border-blue-700 flex flex-col-reverse h-2/3">
        {/* Render chat messages here */}
        {chat.map((message, index) => (
          <div key={index}>
            <strong>{message.name.name}:</strong> {message.input}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          className="border-blue-900 border-b w-80 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatComp;
