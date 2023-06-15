import {
  FormEvent,
  ChangeEvent,
  useState,
  useEffect,
  Fragment,
  Profiler,
  use,
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
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { problemIdStrage } from "../../const";
import { ProblemDocument } from "../../models/Problem";
import { teamIdStrage, userIdStrage } from "../../const";

export default function SelectProblemPage() {
  const [problems, setProblems] = useState<ProblemDocument[]>([]);
  const [teamName, setTeamName] = useState<string>("");
  const router = useRouter();
  const fetchProblems = async () => {
    try {
      let fetchedProblems: ProblemDocument[] = [];
      const teamId = localStorage.getItem(teamIdStrage);
      const res = await axios.get(`/api/teams/${teamId}/problemsAll`);
      if (Array.isArray(res.data))
        res.data.map((problem: ProblemDocument) =>
          fetchedProblems.push(problem)
        );
      fetchedProblems.sort((a, b) => a.reward - b.reward);
      setProblems(fetchedProblems);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchTeamName = async () => {
    try {
      const teamId = localStorage.getItem(teamIdStrage);
      const res = await axios.get(`/api/teams/teamInfo/${teamId}`);
      setTeamName(res.data.name);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem(userIdStrage)) {
      router.push("/enterNamePage");
      return;
    }
    if (!localStorage.getItem(teamIdStrage)) {
      router.push("/selectTeamPage");
      return;
    }
    fetchProblems();
    fetchTeamName();
  }, [router]);

  return (
    <>
      {teamName && (
        <Heading
          as={"h2"}
          fontSize={{ base: "xl", sm: "2xl" }}
          textAlign={"center"}
          mb={5}
        >
          teamname: {teamName}
        </Heading>
      )}
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3,1fr)",
        }}
        gap={6}
        m={10}
      >
        {problems.map((problem, index) => (
          <ProblemPanel problem={problem} key={index} />
        ))}
      </Grid>
    </>
  );
}

function ProblemPanel({ problem }: { problem: ProblemDocument }) {
  const router = useRouter();

  return (
    <Container
      maxW={{ base: "sm", md: "xl" }}
      // bg={useColorModeValue("gray", "blue.100")}
      bg={problem?.selectedChoice === problem?.answer ? "green.100" : "red.100"}
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
        {problem.name}
      </Heading>
      <Heading
        as={"h5"}
        fontSize={{ base: "md", sm: "2md" }}
        textAlign={"center"}
        mb={5}
      >
        reward: {problem.reward}
      </Heading>
      <Heading
        as={"h5"}
        fontSize={{ base: "md", sm: "2md" }}
        textAlign={"center"}
        mb={5}
      >
        {problem.answerCount} / {problem.answerCountLimit}
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
              localStorage.setItem(problemIdStrage, problem._id);
              router.push({
                pathname: "/problemPage",
              });
            }}
          >
            Try it
          </Button>
        </FormControl>
      </VStack>
    </Container>
  );
}
