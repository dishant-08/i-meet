import AllButton from "@/components/AllButton";
import ChatComp from "@/components/ChatComp";
import Player from "@/components/Player";
import { useSocket } from "@/context/socket";
import useMedia from "@/hooks/useMedia";
import usePeer from "@/hooks/usePeer";
import usePlayer from "@/hooks/usePlayer";
import { cloneDeep } from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Room = () => {
  const { roomId } = useRouter().query;
  const { input } = useRouter().query;
  const [isSideBar, setSideBar] = useState(false);

  const socket = useSocket();
  // const { peer, myId } = usePeer();
  socket?.on("connect", () => {
    // console.log(socket);
    // console.log(myId);
    // console.log(peer);
  });
  const { peer, myId } = usePeer();
  const { stream } = useMedia();
  const {
    players,
    setPlayers,
    playerHighlighted,
    nonHighlightedPlayer,
    toggleAudio,
    toggleVideo,
  } = usePlayer(myId);
  console.log(stream);

  useEffect(() => {
    if (!socket || !peer || !stream) return;
    const handleUserConnected = (newId, NewName) => {
      // console.log(`New duaht us u i ewubw j jadjw User ${newId} `);
      const call = peer.call(newId, stream, { metadata: { name: input } }); // calling to another with peerId
      console.log("host host ");
      call?.on("stream", (incomingStream) => {
        console.log(" one 1 11111 ");
        setPlayers((prev) => ({
          ...prev,
          [newId]: {
            url: incomingStream,
            muted: true,
            playing: true,
            name: NewName,
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
          console.log(incomingStream); // host ka stream
          console.log(" two 22222 ");
          setPlayers((prev) => ({
            ...prev,
            [callerId]: {
              url: incomingStream,
              muted: true,
              playing: true,
              name: call.metadata?.name,
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
    console.log(" three 3333333 ");
    setPlayers((prev) => ({
      ...prev,
      [myId]: {
        url: stream,
        muted: true,
        playing: true,
        name: input,
      },
    }));
  }, [myId, setPlayers, stream]);

  useEffect(() => {
    if (!socket) return;
    const handleToggleAudio = (userId) => {
      console.log(`user with id ${userId} toggled audio`);
      setPlayers((prev) => {
        const copy = cloneDeep(prev);
        copy[userId].muted = !copy[userId].muted;
        return { ...copy };
      });
    };

    const handleToggleVideo = (userId) => {
      console.log(`user with id ${userId} toggled video`);
      setPlayers((prev) => {
        const copy = cloneDeep(prev);
        copy[userId].playing = !copy[userId].playing;
        return { ...copy };
      });
    };

    const handleUserLeave = (userId) => {
      console.log(`user ${userId} is leaving the room`);
      users[userId]?.close();
      const playersCopy = cloneDeep(players);
      delete playersCopy[userId];
      setPlayers(playersCopy);
    };
    socket.on("user-toggle-audio", handleToggleAudio);
    socket.on("user-toggle-video", handleToggleVideo);
    socket.on("user-leave", handleUserLeave);
    return () => {
      socket.off("user-toggle-audio", handleToggleAudio);
      socket.off("user-toggle-video", handleToggleVideo);
      socket.off("user-leave", handleUserLeave);
    };
  }, [players, setPlayers, socket]);

  const handleSideBar = (isOpen) => {
    setSideBar(isOpen);
    console.log("dekh sidebar", isSideBar);
  };

  console.log(players);
  // console.log(playerHighlighted);

  return (
    <>
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
      <div className=" flex   ">
        <div className="">
          <main className=" flex flex-col md:hidden    gap-4 ">
            <div className="  md:w-9/12 left-0 right-0 mx-auto top-0 bottom-50  md:h-[calc(100vh-20px-100px)]">
              {playerHighlighted && (
                <Player
                  url={playerHighlighted.url}
                  muted={playerHighlighted.muted}
                  playing={playerHighlighted.playing}
                  name={input}
                  isActive
                />
              )}
            </div>
            <div className=" flex flex-col   overflow-y-auto    left-2 bottom-0 ">
              {nonHighlightedPlayer &&
                Object.keys(nonHighlightedPlayer).map((playerId) => {
                  const { url, muted, playing, name } =
                    nonHighlightedPlayer[playerId];
                  return (
                    <Player
                      key={playerId}
                      url={url}
                      muted={muted}
                      playing={playing}
                      name={name}
                      isActive={false}
                    />
                  );
                })}
            </div>
          </main>
          <main className=" hidden md:block ">
            <div className="absolute w-9/12 left-0 right-0 mx-auto top-20 bottom-50  h-[calc(100vh-20px-100px)]">
              {playerHighlighted && (
                <Player
                  url={playerHighlighted.url}
                  muted={playerHighlighted.muted}
                  playing={playerHighlighted.playing}
                  name={input}
                  isActive
                />
              )}
            </div>
            <div className="absolute flex flex-col   overflow-y-auto w-3/12 z-40 h-[calc(100vh-20px)] left-2 bottom-0 ">
              {nonHighlightedPlayer &&
                Object.keys(nonHighlightedPlayer).map((playerId) => {
                  const { url, muted, playing, name } =
                    nonHighlightedPlayer[playerId];
                  return (
                    <Player
                      key={playerId}
                      url={url}
                      muted={muted}
                      playing={playing}
                      name={name}
                      isActive={false}
                    />
                  );
                })}
            </div>
          </main>

          <AllButton
            muted={playerHighlighted?.muted}
            playing={playerHighlighted?.playing}
            toggleAudio={toggleAudio}
            toggleVideo={toggleVideo}
            sideBar={handleSideBar}
            // leaveRoom={leaveRoom}
          />
        </div>
        {isSideBar && (
          <div className=" mobile-chat   ">
            <ChatComp name={input} />
          </div>
        )}
      </div>
    </>
  );
};

export default Room;
