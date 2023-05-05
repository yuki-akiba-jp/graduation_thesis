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
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
interface Problem {
  name: string;
  description: string;
  questions: string[];
  answers: string[];
  score: number;
}
export default function SelectProblemPage() {
  const chatgpt: Problem = {
    name: "chatgpt",
    description: "chatgpt",
    questions: ["hello", "how are you", "what is your name"],
    answers: ["hi", "good", "chatgpt"],
    score: 0,
  };
  const twitter: Problem = {
    name: "twitter",
    description: "twitter",
    questions: ["hello", "how are you", "what is your name"],
    answers: ["hi", "good", "chatgpt"],
    score: 0,
  };

  const problems = [chatgpt, twitter];

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

function ProblemPanel({ problem }) {
  const router = useRouter();

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
        {problem.name}
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
              router.push(
                {
                  pathname: "/problemPage",
                  query: { problem: problem },
                },
                "/problemPage"
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
