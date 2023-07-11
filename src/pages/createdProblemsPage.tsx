import { useCallback } from "react";
import { FormEvent, useState, useEffect } from "react";
import {
  VStack,
  FormControl,
  Button,
  Link,
  Heading,
  Container,
  Grid,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { studentCreatedProblemId } from "@/const";

import ProblemByStudent, {
  ProblemByStudentDocument,
} from "@/models/ProblemByStudent";
export default function CreatedProblemsPage() {
  const [problems, setProblems] = useState<ProblemByStudentDocument[]>([]);
  useEffect(() => {
    const getProblems = async () => {
      const res = await axios.get("/api/getProblemsByStudents");
      setProblems(res.data);
    };
    getProblems();
  }, []);
  const router = useRouter();

  return (
    <Container maxW={"7xl"} p="12">
      <Heading as="h1" size="xl" mb="12">
        作成した問題
      </Heading>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {problems.map((problem) => (
          <ProblemPanel problem={problem} key={problem.problemName} />
        ))}
      </Grid>
      <Button colorScheme="blue" size="lg" m={3}>
        <Link href="/createProblemPage">問題登録</Link>
      </Button>
    </Container>
  );
}

function ProblemPanel({ problem }: { problem: ProblemByStudentDocument }) {
  const router = useRouter();

  return (
    <Container
      maxW={{ base: "sm", md: "xl" }}
      bg={"gray.200"}
      boxShadow={"xl"}
      rounded={"lg"}
      p={30}
      style={{ position: "relative" }}
    >
      <Heading
        as={"h2"}
        fontSize={{ base: "xl", sm: "2xl" }}
        textAlign={"center"}
        mb={5}
      >
        {problem.problemName}
      </Heading>
      <Heading
        as={"h2"}
        fontSize={{ base: "xl", sm: "2xl" }}
        textAlign={"center"}
        mb={5}
      >
        {problem.studentId}
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
              router.push({
                pathname: "/checkCreatedProblemPage",
              });
              localStorage.setItem(studentCreatedProblemId, problem._id);
            }}
          >
            問題を見る
          </Button>
        </FormControl>
      </VStack>
    </Container>
  );
}
