import React from "react";

import { Mic, Video, PhoneOff, MicOff, VideoOff } from "lucide-react";
import cx from "classnames";

const AllButton = (props) => {
  const { muted, playing, toggleAudio, toggleVideo, leaveRoom } = props;

  return (
    <div className="w-[30%] fixed  flex justify-between px-2 rounded-xl bg-slate-500 bottom-5 left-0 right-0 mx-auto w-300">
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
    </div>
  );
};

export default AllButton;
