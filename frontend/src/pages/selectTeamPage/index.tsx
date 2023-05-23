import {
  FormEvent,
  ChangeEvent,
  useState,
  useEffect,
  Fragment,
  useMemo,
  useCallback,
} from "react";
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  HStack,
  GridItem,
  Spacer,
} from "@chakra-ui/react";
import React from "react";
import { Router, useRouter } from "next/router";
import { server_url } from "../../const";
import { userIdStrage, teamIdStrage } from "../../const";

export default function SelectTeamPage() {
  const router = useRouter();
  const { playerName, teamNames, fetchPlayerName, fetchTeamNames } =
    useSelectTeamPage();

  useEffect(() => {
    console.log("called");
    if (!router.isReady) return;
    fetchPlayerName();
    fetchTeamNames();
  }, [router.isReady, fetchPlayerName, fetchTeamNames]);

  return (
    <>
      <div>playerName: {playerName}</div>
      <ModalWindow />
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
  const { playerName, teamNames, fetchPlayerName, fetchTeamNames } =
    useSelectTeamPage();

  useEffect(() => {
    if (!router.isReady) return;
    fetchPlayerName();
  });
  const joinTeam = useCallback(async () => {
    try {
      const newTeam = await axios.put(`${server_url}/api/teams/joinTeam`, {
        name: teamName,
        playerName: playerName,
      });
      localStorage.setItem(teamIdStrage, newTeam.data._id);
    } catch (err) {
      console.log(err);
    }
  }, [teamName, playerName]);

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
              router.push({
                pathname: "/selectProblemPage",
              });
            }}
          >
            Enter room
          </Button>
        </FormControl>
      </VStack>
    </Container>
  );
}

function ModalWindow() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [teamName, setTeamName] = useState<string>("");
  const router = useRouter();

  const handleClickCreateTeamBtn = useCallback(async () => {
    try {
      const res = await axios.post(`${server_url}/api/teams`, {
        name: teamName,
      });
      router.reload();
    } catch (err: any) {
      if (err.response.status === 400) {
        if (teamName.length < 3 || teamName.length > 20)
          alert("Team name should be between 3 and 20 characters");
        else alert("Team name already exists");
      }
      console.log(err);
    }
  }, [teamName, router]);
  return (
    <>
      <Button colorScheme={"orange"} type="button" onClick={onOpen}>
        New Team
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chakra UI Modal</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            This is the modal content. You can put anything you like here.
          </ModalBody>

          <ModalFooter>
            <FormControl>
              <Input
                variant={"solid"}
                borderWidth={1}
                color={"gray.800"}
                _placeholder={{
                  color: "gray.400",
                }}
                borderColor={useColorModeValue("gray.300", "gray.700")}
                id={"name"}
                type={"name"}
                minLength={3}
                required
                placeholder={"team name"}
                aria-label={"team name"}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setTeamName(e.target.value)
                }
              />
            </FormControl>
            <Button
              colorScheme="blue"
              mr={3}
              variant="ghost"
              onClick={() => {
                onClose();
              }}
            >
              cancel
            </Button>
            <Button
              colorScheme="orange"
              onClick={() => {
                handleClickCreateTeamBtn();
                onClose();
              }}
            >
              Create Team
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function useSelectTeamPage() {
  const router = useRouter();
  const [playerName, setPlayerName] = useState<string>("");
  const [teamNames, setTeamNames] = useState<string[]>([]);
  const fetchPlayerName = useCallback(async () => {
    try {
      const player = await axios.get(
        `${server_url}/api/players/${localStorage.getItem(userIdStrage)}`
      );
      const playerName = player.data.name;
      setPlayerName(playerName);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const fetchTeamNames = useCallback(async () => {
    try {
      const res = await axios.get(`${server_url}/api/teams`);
      let names: string[] = [];
      res.data.map((obj: any) => names.push(obj.name));
      setTeamNames(names);
    } catch (err) {
      console.log(err);
    }
  }, []);
  return { playerName, teamNames, fetchPlayerName, fetchTeamNames };
}
