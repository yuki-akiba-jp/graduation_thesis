import React from "react";
import { teamIdStrage, userIdStrage } from "@/const";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { Container, Heading, Text, VStack } from "@chakra-ui/react";
import { TeamDocument } from "../../models/Team";
import { useCallback } from "react";
export default function TeamInfoPage() {
  const router = useRouter();
  const [team, setTeam] = useState<TeamDocument | null>(null);

  const fetchTeam = useCallback(async () => {
    const teamId = localStorage.getItem(teamIdStrage);
    const res = await axios.get(`/api/teams/teamInfo/${teamId}`);
    setTeam(res.data);
    console.log(res.data);
  }, []);
  useEffect(() => {
    if (!router.isReady) return;
    if (!localStorage.getItem(userIdStrage)) {
      router.push("/enterNamePage");
      return;
    }
    fetchTeam();
  }, [router, fetchTeam]);
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
            {team?.players.map((player) => player?.name).join(",") ?? ""}
          </Text>
        </VStack>
      </Container>
    </>
  );
}
