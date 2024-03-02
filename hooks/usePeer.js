// import { Socket } from "socket.io-client";

import { useSocket } from "@/context/socket";
import { useRouter } from "next/router";

const { useState, useEffect, useRef } = require("react");

const usePeer = () => {
  const socket = useSocket();
  const roomId = useRouter().query.roomId;
  const [peer, setPeer] = useState();
  const [myId, setMyId] = useState();
  const isPeer = useRef(false);

  useEffect(() => {
    if (isPeer.current) return;
    isPeer.current = true;
    let myPeer;
    (async function PeerInit() {
      myPeer = new (await import("peerjs")).default();
      setPeer(myPeer);
      myPeer.on("open", (id) => {
        // console.log(id);
        console.log(peer);
        setMyId(id);
        socket?.emit("join-room", roomId, id);
      });
    })();
  }, []);

  return {
    peer,
    myId,
  };
};

export default usePeer;
