import React from "react";
import { Heading, Text, Box } from "@chakra-ui/react";
import { ITeam } from "@/models/ITeam";

export function TeamInfo({ team, index }: { team: ITeam; index: number }) {
  return (
    <>
      <Box key={team._id} p={5} shadow="md" borderWidth="1px">
        <Heading fontSize="xl">
          #{index + 1} {team.name}
        </Heading>
        <Text mt={2}>Score: {team.score}</Text>
        <Text mt={2}>
          player: {team.players.map((player) => player.name).join(",") ?? ""}
        </Text>
      </Box>
    </>
  );
}
