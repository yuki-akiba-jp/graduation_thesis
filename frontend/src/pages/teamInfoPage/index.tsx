import React from "react";
import { teamIdStrage } from "@/const";
import { useEffect } from "react";
import axios from "axios";
import { server_url } from "@/const";
import { useState } from "react";
import { useRouter } from "next/router";
import { Container, Heading, Text, VStack } from "@chakra-ui/react";
import { ITeam } from "@/models/ITeam";
export default function TeamInfoPage() {
  const router = useRouter();
  const [team, setTeam] = useState<ITeam | null>(null);
  useEffect(() => {
    const teamId = localStorage.getItem(teamIdStrage);
    const fetchTeam = async () => {
      const res = await axios.get(`${server_url}/api/teams/teamInfo/${teamId}`);
      setTeam(res.data);
      console.log(res.data);
    };
    fetchTeam();
  }, []);
  return (
    <>
      <Container maxW="container.lg">
        <VStack spacing={8}>
          <Heading as="h1" size="2xl">
            Team Info
          </Heading>
          <Text fontSize="xl">teamName: {team?.name}</Text>
          <Text fontSize="xl">Score: {team?.score}</Text>
          <Text fontSize="xl">
            Players:
            {team?.players.map((player) => player.name).join(",") ?? ""}
          </Text>
        </VStack>
      </Container>
    </>
  );
}
