import { FormEvent, ChangeEvent, useState, useEffect, Fragment } from "react";
import axios from "axios";
import {
  VStack,
  FormControl,
  Input,
  Button,
  useColorModeValue,
  Heading,
  Container,
  Flex,
  Grid,
  Box,
  HStack,
  GridItem,
  Spacer,
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userNameState, teamNameState } from "@/recoilStates";
const server_url =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export default function SelectTeamPage() {
  const router = useRouter();
  const [teamName, setTeamName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [teamNames, setTeamNames] = useState<string[]>([
    "one team",
    "two team",
    "three team",
    "four team",
    "five team",
  ]);

  const handleClickCreateTeamBtn = async () => {
    try {
      const res = await axios.post(`${server_url}/api/teams`, {
        name: teamName,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const postTeamName = async (teamName: string) => {
    try {
      const res = await axios.post(`${server_url}/api/teams`, {
        name: teamName,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const deleteTeamName = async (teamName: string) => {
    try {
      const res = await axios.put(`${server_url}/api/teams/deleteTeam`, {
        name: teamName,
      });
      console.log("del", res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getTeamNames = async () => {
    try {
      const res = await axios.get(`${server_url}/api/teams`);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const initForDevelopment = async () => {
    teamNames.map((teamName) => deleteTeamName(teamName));
    // teamNames.map((teamName) => postTeamName(teamName));
    getTeamNames();
  };

  useEffect(() => {
    if (!router.isReady) return;
    setUserName(localStorage.getItem("userName") || "");
    initForDevelopment();
    // setTeamNames([]);
  });

  return (
    <>
      <div>username: {userName}</div>
      <Button
        colorScheme={"orange"}
        type="button"
        onClick={() => {
          handleClickCreateTeamBtn();
        }}
      >
        create team
      </Button>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3,1fr)",
        }}
        gap={6}
        m={10}
      >
        {teamNames.map((teamName, index) => (
          <TeamPanel teamName={teamName} key={index} />
        ))}
      </Grid>
    </>
  );
}

function TeamPanel({ teamName }: { teamName: string }) {
  const router = useRouter();
  const [player, setPlayer] = useState<string>("");
  useEffect(() => {
    if (!router.isReady) return;
    setPlayer(localStorage.getItem("userName") || "name");
  });
  const joinTeam = async () => {
    try {
      const res = await axios.put(`${server_url}/api/teams/joinTeam`, {
        name: teamName,
        player: player,
      });
      console.log("teamName", teamName);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container
      maxW={{ base: "sm", md: "xl" }}
      bg={useColorModeValue("gray", "blue.100")}
      boxShadow={"xl"}
      rounded={"lg"}
      p={30}
    >
      <Heading
        as={"h2"}
        fontSize={{ base: "xl", sm: "2xl" }}
        textAlign={"center"}
        mb={5}
      >
        {teamName}
      </Heading>
      <VStack
        direction={{ base: "column", md: "row" }}
        as={"form"}
        spacing={{ base: "1", md: "10" }}
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
        }}
      >
        <FormControl w={{ base: "100%", md: "40%" }}>
          <Button
            colorScheme={"orange"}
            w="100%"
            type="button"
            onClick={() => {
              joinTeam();
              router.push(
                {
                  pathname: "/selectProblemPage",
                  query: { name: router.query.name, teamName: teamName },
                },
                "/selectProblemPage"
              );
            }}
          >
            Enter room
          </Button>
        </FormControl>
      </VStack>
    </Container>
  );
}

function handleClickEnter() {
  console.log("Link clicked");
}
