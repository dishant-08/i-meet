import Player from "@/components/Player";
import { useSocket } from "@/context/socket";
import useMedia from "@/hooks/useMedia";
import usePeer from "@/hooks/usePeer";
import usePlayer from "@/hooks/usePlayer";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Room = () => {
  const { roomId } = useRouter().query;
  const { input } = useRouter().query;

  const socket = useSocket();
  // const { peer, myId } = usePeer();
  socket?.on("connect", () => {
    // console.log(socket);
    // console.log(myId);
    // console.log(peer);
  });
  const { peer, myId } = usePeer();
  const { stream } = useMedia();
  const { players, setPlayers } = usePlayer();
  console.log(stream);

  useEffect(() => {
    if (!socket || !peer || !stream) return;
    const handleUserConnected = (newId) => {
      // console.log(`New duaht us u i ewubw j jadjw User ${newId} `);
      const call = peer.call(newId, stream); // calling to another with peerId
      // console.log("host host ");
      call.on("stream", (incomingStream) => {
        setPlayers((prev) => ({
          ...prev,
          [newId]: {
            url: incomingStream,
            muted: true,
            playing: true,
          },
        }));
      });
    };
    socket.on("user-connected", handleUserConnected);
    return () => {
      socket.off("user-connected", handleUserConnected);
    };
  }, [peer, setPlayers, stream]);

  useEffect(() => {
    if (!peer || !stream) return;
    console.log(peer);

    // Check if peer is defined and has the 'on' property
    if (peer && peer.on) {
      peer.on("call", (call) => {
        const { peer: callerId } = call;
        // yeh jo hai upar call kiya hoga tabhi yeh calu hoga
        console.log(call);
        console.log("NO on host , only in other");
        call.answer(stream);

        call.on("stream", (incomingStream) => {
          setPlayers((prev) => ({
            ...prev,
            [callerId]: {
              url: incomingStream,
              muted: true,
              playing: true,
            },
          }));
        });
      });
    } else {
      console.error("Peer object is not properly initialized.");
    }
  }, [peer, setPlayers, stream]);

  useEffect(() => {
    if (!stream || !myId) return;
    setPlayers((prev) => ({
      ...prev,
      [myId]: {
        url: stream,
        muted: true,
        playing: true,
      },
    }));
  }, [myId, setPlayers, stream]);

  console.log(players);

  return (
    <div>
      {input}- {roomId}
      {/* {players &&
        Objectplayers.map((item) => {
          return (
            <Player
              key={item}
              url={item.stream}
              muted={item.muted}
              playing={item.playing}
            />
          );
        })} */}
      {players &&
        Object.keys(players).map((playerId) => {
          const { url, muted, playing } = players[playerId];
          return (
            <Player
              key={playerId}
              url={url}
              muted={muted}
              playing={playing}
              isActive={false}
            />
          );
        })}
    </div>
  );
};

export default Room;
