import React, { useCallback } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { Container, Heading, VStack } from "@chakra-ui/react";
import { TeamInfo } from "../../components/TeamInfo";
import { TeamDocument } from "@/models/Team";
import { userIdStrage } from "@/const";

export default function RankingPage() {
  const router = useRouter();
  const [teams, setTeams] = useState<TeamDocument[]>([]);
  const fetchTeams = useCallback(async () => {
    const res = await axios.get(`/api/teams`);
    setTeams(res.data);
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    if (!localStorage.getItem(userIdStrage)) {
      router.push("/enterNamePage");
      return;
    }
    fetchTeams();
  }, [router, fetchTeams]);
  return (
    <>
      <Container maxW="container.lg">
        <VStack spacing={8}>
          <Heading as="h1" size="2xl">
            RANKING
          </Heading>
          {teams &&
            teams
              .sort((a, b) => (b.score || 0) - (a.score || 0))
              .map((team, index) => (
                <TeamInfo team={team} index={index} key={index} />
              ))}
        </VStack>
      </Container>
    </>
  );
}
