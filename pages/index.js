import Image from "next/image";
import { Inter } from "next/font/google";
import { useSocket } from "@/context/socket";
import usePeer from "@/hooks/usePeer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // const socket = useSocket();
  // // const { peer, myId } = usePeer();
  // socket?.on("connect", () => {
  //   console.log(socket);
  //   console.log(myId);
  //   console.log(peer);
  // });
  // const { peer, myId } = usePeer();

  // useEffect(() => {
  //   // Access peer and myId here
  //   if (peer && myId) {
  //     console.log("Peer:", peer);
  //     console.log("My ID:", myId);
  //   }
  // }, [peer, myId]);

  const router = useRouter();
  const [input, setInput] = useState();
  const [roomId, setRoomId] = useState();

  const createAndJoin = () => {
    const op = uuidv4();
    setRoomId(op);
    // router.push(` /${roomId} `);
  };
  // console.log(socket);
  return (
    <>
      <h1 className="text-center my-8 text-3xl">Video chat App</h1>
      {/* host meeting */}
      <div className="flex flex-col container mx-auto  md:flex-row">
        <div className="mx-auto p-4 w-full  md:w-1/3">
          <h2 className=" text-2xl text-center my-6 text-green-600 ">
            Create The Meeting
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(input, roomId);
              router.push(`/${input}/${roomId}`);
            }}
            className=" flex flex-col mx-auto space-y-6 "
          >
            {/* {code && (
              <div
                type="text"
                className="border p-2 flex flex-row justify-between"
              >
                <p className=" w-11/12 overflow-hidden">{code}</p>
                {!copys ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={copy}
                    className="h-6 w-6 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-500 bg-slate-100 rounded-xl"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            )} */}
            <button
              className=" bg-blue-500 text-white py-2 rounded-lg "
              onClick={createAndJoin}
            >
              Create Meeting
            </button>
          </form>
        </div>
        {/* join meeting */}
        <div className="mx-auto p-4 w-full  md:w-1/3">
          <h2 className="text-2xl text-center my-6 text-green-600 ">
            join The Meeting
          </h2>
          <form
            className="flex flex-col mx-auto space-y-6 "
            onSubmit={(e) => {
              e.preventDefault();
              console.log(input, roomId);
              router.push(`/${input}/${roomId}`);
            }}
          >
            <input
              required={true}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="border p-2"
              placeholder="Enter your Name"
            />
            <input
              required
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              type="text"
              className="border p-2"
              placeholder="Enter your code"
            />
            <button
              type="submit"
              className=" bg-blue-500 text-white py-2 rounded-lg"
            >
              join Meeting
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
