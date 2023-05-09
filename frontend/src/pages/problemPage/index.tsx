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
import { problemId, server_url } from "../../const";
import { Problem } from "@/models/Problem";
import axios from "axios";

export default function ProblemPage() {
  const router = useRouter();
  const [problem, setProblem] = useState<Problem>();
  const [selectedChoices, setSelectedChoices] = useState<string[]>([]);
  const handleClickChoice = (choice: string) => {
    if (selectedChoices.includes(choice)) {
      let choices = [...selectedChoices];
      choices.splice(selectedChoices.indexOf(choice), 1);
      setSelectedChoices(choices);
      return;
    }
    const maxSelectedChoces = 3;
    if (selectedChoices.length < maxSelectedChoces) {
      setSelectedChoices([...selectedChoices, choice]);
    }
  };

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const id = localStorage.getItem(problemId);
        const res = await axios.get(`${server_url}/api/problems/problem/${id}`);
        setProblem(res.data);
      } catch (err) {
        console.log(err);
      }
    };
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
          as={"h2"}
          fontSize={{ base: "xl", sm: "2xl" }}
          textAlign={"center"}
          mb={5}
        >
          {problem?.name}
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
            <Text fontSize="md" fontWeight="bold" mb={4} textAlign="center">
              {problem?._id}
            </Text>
            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3,1fr)",
              }}
              gap={6}
              m={10}
            >
              {problem?.selectableChoices.map((choice, index) => (
                <Button
                  colorScheme={"orange"}
                  w="100%"
                  type="button"
                  key={index}
                  onClick={() => handleClickChoice(choice)}
                >
                  {choice}
                  {selectedChoices.includes(choice) ? "✅" : ""}
                </Button>
              ))}
            </Grid>
            <Button
              colorScheme="teal"
              w="30%"
              justifyContent="center"
              type="button"
            >
              submit
            </Button>
          </FormControl>
        </VStack>
      </Container>
    </>
  );
}
