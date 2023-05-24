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
import { server_url, problemIdStrage } from "../../const";
import { IProblem } from "@/models/IProblem";
import { teamIdStrage } from "../../const";

export default function SelectProblemPage() {
  const [problems, setProblems] = useState<IProblem[]>([]);
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        let fetchedProblems: IProblem[] = [];
        const teamId = localStorage.getItem(teamIdStrage);
        const res = await axios.get(
          `${server_url}/api/teams/${teamId}/problemsAll`
        );
        res.data.map((problem: IProblem) => fetchedProblems.push(problem));
        setProblems(fetchedProblems);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProblems();
  }, []);

  return (
    <>
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

function ProblemPanel({ problem }: { problem: IProblem }) {
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
