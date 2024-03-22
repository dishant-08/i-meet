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
    <div className="md:absolute px-1 gap-3 z-40 w-full  right-0 flex flex-col rounded-xl p-2 bg-slate-400 h-[92%] md:w-1/5">
      <div className=" relative  ">
        <div className=" p-2   bg-slate-400  flex flex-col overflow-y-auto  h-[600px] ">
          {/* Render chat messages here */}
          <div className=" absolute bottom-0  ">
            {chat.map((message, index) => (
              <div key={index} className="flex  ">
                <strong className=" mx-1 ">{message.name.name}:</strong>{" "}
                {message.input}
              </div>
            ))}
          </div>
        </div>
      </div>
      <form className=" flex gap-3 " onSubmit={handleSendMessage}>
        <input
          type="text"
          className="border-blue-900 border-b p-2 rounded-xl w-80 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className=" p-1 rounded-md bg-red-500 text-white "
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatComp;
