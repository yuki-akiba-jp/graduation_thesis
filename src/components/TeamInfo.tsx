import React, { useEffect, useState } from "react";
import { Heading, Text, Box } from "@chakra-ui/react";
import { TeamDocument } from "../models/Team";
import { userIdStrage } from "../const";
import axios from "axios";
import { useCallback } from "react";

export function TeamInfo({
  team,
  index,
}: {
  team: TeamDocument;
  index: number;
}) {
  const [playerName, setPlayerName] = useState<string>("");
  const [isPlayersTeam, setIsPlayersTeam] = useState<boolean>(false);

  const fetchPlayerName = useCallback(async () => {
    try {
      const player = await axios.get(
        `/api/players/${localStorage.getItem(userIdStrage)}`
      );
      const playerName = player.data.name;
      setPlayerName(playerName);
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    fetchPlayerName();
    if (team.players.map((player) => player?.name).includes(playerName))
      setIsPlayersTeam(true);
  }, [fetchPlayerName, team.players, playerName]);

  return (
    <>
      <Box
        key={team._id}
        p={5}
        w="80%"
        shadow="md"
        borderWidth="1px"
        color={isPlayersTeam ? "red" : "black"}
      >
        <Heading fontSize="xl">
          #{index + 1} {team.name}
        </Heading>
        <Text mt={2}>Score: {team.score}</Text>
        <Text mt={2}>
          player: {team.players.map((player) => player?.name).join(",") ?? ""}
        </Text>
      </Box>
    </>
  );
}
