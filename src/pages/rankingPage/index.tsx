import React, { useCallback } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Container, Heading, VStack } from "@chakra-ui/react";
import { TeamInfo } from "../../components/TeamInfo";
import { TeamDocument ,TeamForRanking} from "@/models/Team";
import { userIdStrage } from "@/const";
import Link from "next/link";

export default function RankingPage() {
  const router = useRouter();
  const [teams, setTeams] = useState<TeamForRanking[]>([]);
  const fetchTeams = useCallback(async () => {
    const res = await axios.get(`/api/teams/teamforranking`);
    setTeams(res.data);
  }, []);

  useEffect(() => {
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
