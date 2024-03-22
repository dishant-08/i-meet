import Image from "next/image";
import { Inter } from "next/font/google";
import { useSocket } from "@/context/socket";
import usePeer from "@/hooks/usePeer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import Mask from "../images/Mask.png";
import FooterBg from "../images/Bitmap.png";
import Mask1 from "../images/Mask(1).png";
import Mask2 from "../images/Mask(2).png";
import Mask3 from "../images/Mask(3).png";
import Mask4 from "../images/Mask(4).png";
import Mask5 from "../images/Mask(5).png";
import Mask6 from "../images/Mask(6).png";
import Mask7 from "../images/Mask(7).png";
import Mask8 from "../images/Mask(8).png";
import Mask9 from "../images/Mask(9).png";
import Mask10 from "../images/Mask(10).png";
import Mask11 from "../images/Mask(11).png";
import Logo from "@/images/Group10.png";

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
      <div className="text-center font-semibold flex items-center justify-center gap-3 my-8 text-3xl">
        <Image src={Logo} alt="logo" />
        <div>Video Chatting</div>
      </div>
      <header className="flex md:px-32 gap-3 justify-center md:justify-around w-screen ">
        <div className=" flex  flex-col ">
          <div className="flex gap-x-3 items-end ">
            <Image
              className=" mb-3 w-12 h-12 md:w-28 md:h-28 "
              src={Mask1}
              alt="Mask"
            />
            <Image
              className=" mb-10 w-12 h-12 md:w-28 md:h-28 "
              src={Mask}
              alt="Mask"
            />
            <Image
              className=" mb-3  w-12 h-12 md:w-28 md:h-28 "
              src={Mask2}
              alt="Mask"
            />
          </div>
          <div className=" flex gap-x-3  items-start ">
            <Image
              className=" mt-10  w-12 h-12 md:w-28 md:h-28 "
              src={Mask3}
              alt="Mask"
            />
            <Image
              className=" mt-2  w-12 h-12 md:w-28 md:h-28 "
              src={Mask4}
              alt="Mask"
            />
            <Image
              className=" mt-10 w-12 h-12 md:w-28 md:h-28  "
              src={Mask5}
              alt="Mask"
            />
          </div>
        </div>
        <div className=" md:flex flex-col gap-5 hidden   justify-center items-end ">
          <h1 className=" font-bold text-6xl  ">Group Chat </h1>
          <p className=" font-medium text-3xl ">
            Meet makes it easy to connect v.
          </p>
        </div>

        <div className=" flex  flex-col ">
          <div className="flex gap-x-3 items-end ">
            <Image
              className=" mb-10 w-12 h-12 md:w-28 md:h-28  "
              src={Mask6}
              alt="Mask"
            />
            <Image
              className=" mb-2  w-12 h-12 md:w-28 md:h-28 "
              src={Mask8}
              alt="Mask"
            />
            <Image
              className=" mb-10  w-12 h-12 md:w-28 md:h-28 "
              src={Mask7}
              alt="Mask"
            />
          </div>
          <div className=" flex gap-x-3  items-start ">
            <Image
              className=" mt-3  w-12 h-12 md:w-28 md:h-28 "
              src={Mask9}
              alt="Mask"
            />
            <Image
              className=" mt-10  w-12 h-12 md:w-28 md:h-28 "
              src={Mask11}
              alt="Mask"
            />
            <Image
              className=" mt-3  w-12 h-12 md:w-28 md:h-28 "
              src={Mask10}
              alt="Mask"
            />
          </div>
        </div>
      </header>
      <div className=" flex flex-col gap-5 mt-4  md:hidden  justify-center items-center ">
        <h1 className=" font-bold text-4xl  ">Group Chat </h1>
        <p className=" font-medium text-2xl text-center ">
          Meet makes it easy to connect virtually.
        </p>
      </div>
      {/* host meeting */}
      <div className="flex flex-col container mx-auto  md:flex-row">
        <div className="mx-auto p-4 w-full  md:w-1/3">
          <h2 className=" text-2xl text-center my-6  ">Create The Meeting</h2>
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
              className=" bg-prime text-white py-2 rounded-lg "
              onClick={createAndJoin}
            >
              Create Meeting
            </button>
          </form>
        </div>
        {/* join meeting */}
        <div className="mx-auto p-4 w-full  md:w-1/3">
          <h2 className="text-2xl text-center my-6 font-medium ">
            Join The Meeting
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
              className=" bg-prigray text-white py-2 rounded-lg"
            >
              Join Meeting
            </button>
          </form>
        </div>
      </div>
      <main className=" flex flex-col  mt-14 ">
        <footer className="relative  w-screen">
          <Image
            className="mt-10 min-h-36 w-screen"
            src={FooterBg}
            alt="Mask"
          />
          <div className="absolute top-2 left-0 w-full h-full flex flex-col gap-3 items-center justify-center">
            <span className="text-gray-400 text-2xl md:text-4xl font-bold">
              Experience more together
            </span>
            <span className="text-gray-400  md:text-2xl font-semibold">
              Stay connected with reliable HD meetings and unlimited one-on-one
              and group video sessions.
            </span>
          </div>
        </footer>
      </main>
    </>
  );
}
