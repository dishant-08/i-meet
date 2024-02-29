import Player from "@/components/Player";
import { useSocket } from "@/context/socket";
import useMedia from "@/hooks/useMedia";
import usePeer from "@/hooks/usePeer";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Room = () => {
  const { roomId } = useRouter().query;
  const { input } = useRouter().query;

  const socket = useSocket();
  // const { peer, myId } = usePeer();
  socket?.on("connect", () => {
    console.log(socket);
    console.log(myId);
    console.log(peer);
  });
  const { peer, myId } = usePeer();
  const { stream } = useMedia();
  // console.log(stream);

  useEffect(() => {
    const handleUserConnected = (newId) => {
      console.log(`New duaht us u i ewubw j jadjw User ${newId} `);
    };
    socket.on("user-connected", handleUserConnected);
    return () => {
      socket.off("user-connected", handleUserConnected);
    };
  }, [peer, myId, stream]);

  return (
    <div>
      {input}- {roomId}
      <Player url={stream} muted playing />
    </div>
  );
};

export default Room;
