import React from "react";
import ReactPlayer from "react-player";

const Player = ({ url, muted, playing, name, isActive }) => {
  return (
    <div>
      <div className="relative">
        <ReactPlayer
          url={url}
          muted={muted}
          playing={playing}
          width="60%"
          height="60%"
        />
        <div className=" text-white text-2xl capitalize absolute left-1 bottom-1 font-bold ">
          {name}{" "}
        </div>
      </div>
    </div>
  );
};

export default Player;
