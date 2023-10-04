import {
  FormEvent,
  ChangeEvent,
  useState,
  useEffect,
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
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import { userIdStrage, teamIdStrage } from "../../const";

export default function SelectTeamPage() {
  const router = useRouter();
  const { playerName, teamNames, fetchPlayerName, fetchTeamNames } =
    useSelectTeamPage();

  useEffect(() => {
    if (!localStorage.getItem(userIdStrage)) {
      router.push("/enterNamePage");
      return;
    } else {
      fetchPlayerName();
      fetchTeamNames();
    }
  }, [router, fetchPlayerName, fetchTeamNames]);

  return (
    <>
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
          <TeamPanel teamName={teamName} key={index} playerName={playerName} />
        ))}
      </Grid>
    </>
  );
}

function TeamPanel({
  teamName,
  playerName,
}: {
  teamName: string;
  playerName: string;
}) {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
  });
  const joinTeam = useCallback(async () => {
    try {
      const newTeam = await axios.put(`/api/teams/joinTeam`, {
        name: teamName,
        playerName: playerName,
      });
      localStorage.setItem(teamIdStrage, newTeam.data._id);
      router.push({
        pathname: "/selectProblemPage",
      });
    } catch (err) {
      console.log(err);
    }
  }, [teamName, playerName, router]);

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
            onClick={async () => {
              await joinTeam();
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

  const handleClickCreateTeamBtn = useCallback(
    async (e: FormEvent) => {
      e.preventDefault(); // Prevent the default form submission behavior
      try {
        await axios.post(`/api/teams`, {
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
      onClose();
    },
    [teamName, router, onClose]
  );

  return (
    <>
      <Button colorScheme={"orange"} type="button" onClick={onOpen}>
        新しいチームを作る
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Team</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleClickCreateTeamBtn}>
            <ModalBody>
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
                  autoFocus
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                variant="ghost"
                onClick={onClose}
              >
                キャンセル
              </Button>
              <Button colorScheme="orange" type="submit">
                作成
              </Button>
            </ModalFooter>
          </form>
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
        `/api/players/${localStorage.getItem(userIdStrage)}`
      );
      const playerName = player.data.name;
      setPlayerName(playerName);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const fetchTeamNames = useCallback(async () => {
    try {
      const res = await axios.get(`/api/teams/teamnames`);
      setTeamNames(res.data);
    } catch (err) {
      console.log(err);
    }
  }, []);
  return { playerName, teamNames, fetchPlayerName, fetchTeamNames };
}
