import { useSocket } from "@/context/socket";

import { cloneDeep } from "lodash";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Socket } from "socket.io-client";

const usePlayer = (myId) => {
  const socket = useSocket();
  const { roomId } = useRouter().query;
  const [players, setPlayers] = useState({});

  const playerCopy = cloneDeep(players);

  const playerHighlighted = players[myId];

  delete playerCopy[myId];

  const nonHighlightedPlayer = playerCopy;

  const toggleAudio = () => {
    setPlayers((prev) => {
      const allPlayer = cloneDeep(prev);

      allPlayer[myId].muted = !allPlayer[myId].muted;

      return { ...allPlayer };
    });
    socket.emit("toggle-audio", roomId, myId);
  };
  const toggleVideo = () => {
    setPlayers((prev) => {
      const allPlayer = cloneDeep(prev);
      allPlayer[myId].playing = !allPlayer[myId].playing;
      return { ...allPlayer };
    });
    socket.emit("toggle-video", roomId, myId);
  };

  // const nonHighlightedPlayer = playerCopy;
  return {
    players,
    setPlayers,
    playerHighlighted,
    nonHighlightedPlayer,
    toggleAudio,
    toggleVideo,
  };
};

export default usePlayer;
