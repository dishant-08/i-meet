import React from "react";
import ReactPlayer from "react-player";

const Player = ({ url, muted, playing, name, isActive }) => {
  return (
    <div>
      <div className="relative mx-2 ">
        <ReactPlayer
          url={url}
          muted={muted}
          playing={playing}
          width="80%"
          height="70%"
        />
        <div className=" text-white text-2xl capitalize absolute left-1 bottom-1 font-bold ">
          {name}{" "}
        </div>
      </div>
    </div>
  );
};

export default Player;
