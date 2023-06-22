import { useCallback } from "react";
import { FormEvent, useState, useEffect } from "react";
import {
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  Modal,
  VStack,
  FormControl,
  Button,
  useColorModeValue,
  Heading,
  Container,
  Grid,
  HStack,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import React from "react";
import { useRouter } from "next/router";
import { problemIdStrage, teamIdStrage } from "../../const";
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

  const [startTime, setStartTime] = useState<Date | null>(null);

  useEffect(() => {
    if (!startTime) setStartTime(new Date());
    fetchProblem();
  }, [fetchProblem, startTime]);

  return (
    <>
      <Container
        minW="100vw"
        minH="100vh"
        boxShadow={"xl"}
        rounded={"lg"}
        alignItems={"center"}
      >
        <VStack
          direction={{ base: "column", md: "row" }}
          rounded={"xl"}
          as={"form"}
          spacing={{ base: "1", md: "10" }}
          bg={useColorModeValue("blue.100", "gray.700")}
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
          }}
          py={20}
        >
          <Heading
            as={"h1"}
            fontSize={{ base: "2xl", sm: "3xl" }}
            fontStyle={"italic"}
            textAlign={"center"}
            mb={5}
          >
            {problem?.name}
            <Spacer />
            {problem?.answerCount} / {problem?.answerCountLimit}
          </Heading>
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
                  whiteSpace={"normal"}
                  height={"auto"}
                  blockSize={"auto"}
                  p={5}
                  // isTruncated
                >
                  {choice}
                </Button>
              ))}
            </Grid>

            <SubmitAnswerModal
              problem={problem}
              selectedChoice={selectedChoice}
              fetchProblem={fetchProblem}
              startTime={startTime}
              setStartTime={setStartTime}
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
      setSelectableChoices(res.data.choices);
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
  startTime,
  setStartTime,
}: {
  problem: any;
  selectedChoice: string;
  fetchProblem: () => void;
  startTime: Date | null;
  setStartTime: React.Dispatch<React.SetStateAction<Date | null>>;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const getAnswerTime = () => {
    const endTime = new Date();
    if (startTime) {
      const diff = endTime.getTime() - startTime.getTime();
      return diff / 1000;
    }
    return null;
  };

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

        {problem?.answerCount < problem?.answerCountLimit &&
          problem?.answer !== problem?.selectedChoice && (
            <Button
              colorScheme="teal"
              w="30%"
              type="button"
              onClick={async () => {
                const teamId = localStorage.getItem(teamIdStrage);
                await axios.put(
                  `/api/teams/updateProblem/${teamId}/${problem?._id}`,
                  {
                    selectedChoice,
                    answerTime: getAnswerTime(),
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
          )}
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>RESULT</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {problem?.answer === selectedChoice ? (
              <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                正解です😁
              </Text>
            ) : (
              <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                不正解です😭
                {problem?.answerCount == problem?.answerCountLimit && (
                  <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                    正解は [{problem?.answer}]です
                  </Text>
                )}
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
            {problem?.answer === selectedChoice ? (
              <Button
                colorScheme="orange"
                mr={3}
                onClick={() => {
                  onClose();
                  localStorage.setItem(problemIdStrage, problem._id);
                  router.push({
                    pathname: "/problemPage",
                  });
                }}
              >
                OK
              </Button>
            ) : (
              <Button
                colorScheme="orange"
                mr={3}
                onClick={() => {
                  onClose();
                  setStartTime(new Date());
                }}
              >
                もう一回
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function shuffleArray(array: string[]): string[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}
