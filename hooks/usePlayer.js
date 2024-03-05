import { cloneDeep } from "lodash";
import React, { useState } from "react";

const usePlayer = (myId) => {
  const [players, setPlayers] = useState({});

  const playerCopy = cloneDeep(players);

  const playerHighlighted = players[myId];

  delete playerCopy[myId];

  const nonHighlightedPlayer = playerCopy;

  // const nonHighlightedPlayer = playerCopy;
  return { players, setPlayers, playerHighlighted, nonHighlightedPlayer };
};

export default usePlayer;
