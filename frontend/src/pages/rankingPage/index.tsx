import React, { useCallback } from "react";
import { useEffect } from "react";
import axios from "axios";
import { server_url } from "@/const";
import { useState } from "react";
import { useRouter } from "next/router";
import { Container, Heading, VStack } from "@chakra-ui/react";
import { TeamInfo } from "@/components/TeamInfo";
import { ITeam } from "@/models/ITeam";

export default function RankingPage() {
  const router = useRouter();
  const [teams, setTeams] = useState<ITeam[]>([]);
  const fetchTeams = useCallback(async () => {
    const res = await axios.get(`${server_url}/api/teams`);
    setTeams(res.data);
  }, []);
  useEffect(() => {
    fetchTeams();
  }, []);
  return (
    <>
      <Container maxW="container.lg">
        <VStack spacing={8}>
          <Heading as="h1" size="2xl">
            RANKING
          </Heading>
          {teams &&
            teams
              .sort((a, b) => b.score - a.score)
              .map((team, index) => (
                <TeamInfo team={team} index={index} key={index} />
              ))}
        </VStack>
      </Container>
    </>
  );
}
