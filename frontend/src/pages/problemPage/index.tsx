import {
  FormEvent,
  ChangeEvent,
  useState,
  useEffect,
  Fragment,
  Profiler,
} from "react";
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
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import { server_url } from "../../const";
import { Problem } from "@/models/Problem";
import { problemIdStrage, teamIdStrage, userIdStrage } from "../../const";
import axios from "axios";

export default function ProblemPage() {
  const router = useRouter();
  const {
    fetchProblem,
    problem,
    selectedChoice,
    selectableChoices,
    handleClickChoice,
  } = useProblemPage();

  useEffect(() => {
    fetchProblem();
  }, []);

  return (
    <>
      <Container
        minW="100vw"
        minH="100vh"
        bg={useColorModeValue("gray", "blue.100")}
        boxShadow={"xl"}
        rounded={"lg"}
        // p={30}
      >
        <Heading
          as={"h1"}
          fontSize={{ base: "2xl", sm: "3xl" }}
          textAlign={"center"}
          mb={5}
        >
          problem name: {problem?.name}
        </Heading>
        <VStack
          direction={{ base: "column", md: "row" }}
          as={"form"}
          spacing={{ base: "1", md: "10" }}
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
          }}
        >
          <FormControl w={{ base: "100%", md: "100%" }}>
            <Text
              fontSize={{ base: "2xl", sm: "3xl" }}
              fontWeight="bold"
              mb={4}
              textAlign="center"
            >
              {problem?.description}
            </Text>
            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(2,1fr)",
              }}
              gap={6}
              m={10}
            >
              {selectableChoices.map((choice, index) => (
                <Button
                  colorScheme={choice === selectedChoice ? "green" : "orange"}
                  w="100%"
                  type="button"
                  key={index}
                  onClick={() => handleClickChoice(choice)}
                >
                  {choice}
                </Button>
              ))}
            </Grid>
            <Button
              colorScheme="teal"
              w="30%"
              justifyContent="center"
              type="button"
              onClick={async () => {
                const teamId = localStorage.getItem(teamIdStrage);
                await axios.put(
                  `${server_url}/api/teams/updateProblem/${teamId}/${problem?._id}`,
                  {
                    selectedChoice,
                  }
                );
                await axios.put(
                  `${server_url}/api/teams/updateScore/${teamId}`
                );
                fetchProblem();
                if (problem?.answer === selectedChoice)
                  alert("correct answer!");
                else alert("wrong answer...");
              }}
            >
              submit answer
            </Button>
          </FormControl>
        </VStack>
      </Container>
    </>
  );
}

function useProblemPage() {
  const [problem, setProblem] = useState<Problem>();
  const [selectedChoice, setSelectedChoice] = useState<string>("");
  const [selectableChoices, setSelectableChoices] = useState<string[]>([]);
  const handleClickChoice = (choice: string) => {
    setSelectedChoice(choice);
  };
  const fetchProblem = async () => {
    try {
      const problemId = localStorage.getItem(problemIdStrage);
      const teamId = localStorage.getItem(teamIdStrage);
      const res = await axios.get(
        `${server_url}/api/teams/problems/${teamId}/${problemId}`
      );
      setProblem(res.data);
      setSelectedChoice(res.data.selectedChoice);
      setSelectableChoices([...res.data.choices]);
    } catch (err) {
      console.log(err);
    }
  };
  return {
    problem,
    setProblem,
    selectedChoice,
    selectableChoices,
    handleClickChoice,
    fetchProblem,
  };
}
