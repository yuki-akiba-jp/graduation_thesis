import { useCallback } from "react";
import {
  FormEvent,
  ChangeEvent,
  useState,
  useEffect,
  Fragment,
  Profiler,
} from "react";
import {
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  Stack,
  Modal,
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
import { useDisclosure } from "@chakra-ui/hooks";
import React from "react";
import { useRouter } from "next/router";
import { problemIdStrage, teamIdStrage, userIdStrage } from "../../const";
import axios from "axios";

import { ProblemDocument } from "../../models/Problem";
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
  }, [fetchProblem]);

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
          fontStyle={"italic"}
          textAlign={"center"}
          mb={5}
        >
          {problem?.name}
          {problem?.answerCount} / {problem?.answerCountLimit}
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
              fontSize={{ base: "xl", sm: "2xl" }}
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
                  isTruncated
                >
                  {choice}
                </Button>
              ))}
            </Grid>

            <SubmitAnswerModal
              problem={problem}
              selectedChoice={selectedChoice}
              fetchProblem={fetchProblem}
            />
          </FormControl>
        </VStack>
      </Container>
    </>
  );
}

function useProblemPage() {
  const [problem, setProblem] = useState<ProblemDocument>();
  const [selectedChoice, setSelectedChoice] = useState<string>("");
  const [selectableChoices, setSelectableChoices] = useState<string[]>([]);
  const handleClickChoice = (choice: string) => {
    setSelectedChoice(choice);
  };
  const fetchProblem = useCallback(async () => {
    try {
      const problemId = localStorage.getItem(problemIdStrage);
      const teamId = localStorage.getItem(teamIdStrage);
      const res = await axios.get(`/api/teams/problems/${teamId}/${problemId}`);
      setProblem(res.data);
      setSelectedChoice(res.data.selectedChoice);
      setSelectableChoices([res.data.answer, ...res.data.choices]);
    } catch (err) {
      console.log(err);
    }
  }, [setProblem, setSelectedChoice, setSelectableChoices]);

  return {
    problem,
    setProblem,
    selectedChoice,
    selectableChoices,
    handleClickChoice,
    fetchProblem,
  };
}

function SubmitAnswerModal({
  problem,
  selectedChoice,
  fetchProblem,
}: {
  problem: any;
  selectedChoice: string;
  fetchProblem: () => void;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  return (
    <>
      <HStack justifyContent={"center"}>
        <Button
          colorScheme="blue"
          w="30%"
          type="button"
          onClick={() => {
            router.push({
              pathname: "/selectProblemPage",
            });
          }}
          isTruncated
        >
          back
        </Button>
        <Button
          colorScheme="teal"
          w="30%"
          type="button"
          onClick={async () => {
            if (problem?.answerCount >= problem?.answerCountLimit) {
              alert("answer count limit");
              return;
            }
            const teamId = localStorage.getItem(teamIdStrage);
            await axios.put(
              `/api/teams/updateProblem/${teamId}/${problem?._id}`,
              {
                selectedChoice,
              }
            );
            await axios.put(`/api/teams/updateScore/${teamId}`);
            fetchProblem();
            onOpen();
          }}
          isTruncated
        >
          submit
        </Button>
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>RESULT</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {problem?.answer === selectedChoice ? (
              <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                correct answer!
              </Text>
            ) : (
              <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                wrong answer...
              </Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              variant="ghost"
              onClick={() => {
                router.push({
                  pathname: "/selectProblemPage",
                });
                onClose();
              }}
            >
              問題一覧へ
            </Button>
            <Button
              colorScheme="orange"
              mr={3}
              onClick={() => {
                onClose();
              }}
            >
              もう一回
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
