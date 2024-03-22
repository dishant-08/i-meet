import React, { useState } from "react";

import {
  Mic,
  Video,
  PhoneOff,
  MicOff,
  VideoOff,
  MessageCircleMore,
} from "lucide-react";
import cx from "classnames";

const AllButton = (props) => {
  const { muted, playing, toggleAudio, toggleVideo, leaveRoom, sideBar } =
    props;
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!isOpen);
    sideBar(!isOpen);
  };

  return (
    <div className=" w-full md:w-[30%] fixed  flex justify-between py-2 px-10 rounded-xl bg-slate-500 bottom-5 left-0 right-0 mx-auto w-300">
      {muted ? (
        <MicOff
          className={cx("p-4 rounded-full text-white cursor-pointer", {
            "bg-secondary": true,
            "bg-buttonPrimary hover:bg-buttonPrimary": muted,
          })}
          size={55}
          onClick={toggleAudio}
        />
      ) : (
        <Mic
          className="p-4 rounded-full text-white cursor-pointer bg-secondary hover:bg-buttonPrimary"
          size={55}
          onClick={toggleAudio}
        />
      )}
      {playing ? (
        <Video
          className="p-4 rounded-full text-white cursor-pointer bg-secondary hover:bg-buttonPrimary"
          size={55}
          onClick={toggleVideo}
        />
      ) : (
        <VideoOff
          className={cx("p-4 rounded-full text-white cursor-pointer", {
            "bg-secondary": true,
            "bg-buttonPrimary hover:bg-buttonPrimary": !playing,
          })}
          size={55}
          onClick={toggleVideo}
        />
      )}
      <PhoneOff
        size={55}
        className="p-4 rounded-full text-white cursor-pointer bg-secondary hover:bg-buttonPrimary"
        onClick={leaveRoom}
      />
      <MessageCircleMore
        size={55}
        className="p-4 rounded-full text-white cursor-pointer bg-secondary hover:bg-buttonPrimary"
        onClick={handleOpen}
      />
      {/* <button onClick={() => console.log("helllo indar")}>jio</button> */}
    </div>
  );
};

export default AllButton;
