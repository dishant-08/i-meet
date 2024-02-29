import React from "react";
import ReactPlayer from "react-player";

const Player = ({ url, muted, playing, isActive }) => {
  return (
    <ReactPlayer
      url={url}
      muted={muted}
      playing={playing}
      width="100%"
      height="100%"
    />
  );
};

export default Player;
