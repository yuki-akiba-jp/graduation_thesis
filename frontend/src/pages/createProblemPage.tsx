import { FormEvent, ChangeEvent, useState, useEffect } from "react";
import {
  useColorModeValue,
  Heading,
  Container,
  Flex,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  Textarea,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userNameState, teamNameState } from "@/recoilStates";
import axios from "axios";
import { server_url } from "../const";

export default function CreateProblemPage() {
  const router = useRouter();
  const [name, setName] = useState<string>("name");
  const [description, setDescription] = useState<string>("description");
  const [reward, setReward] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>(["ans1", "ans2", "ans3"]);
  const [choices, setChoices] = useState<string[]>([
    "choice1",
    "choice2",
    "choice3",
    "choice4",
    "choice5",
    "choice6",
    "choice7",
  ]);

  const handleAnswerChange = (index: number, value: string) => {
    setAnswers((prev) => {
      const updatedAnswers = [...prev];
      updatedAnswers[index] = value;
      return updatedAnswers;
    });
  };

  const handleChoiceChange = (index: number, value: string) => {
    setChoices((prev) => {
      const updatedChoices = [...prev];
      updatedChoices[index] = value;
      return updatedChoices;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      name === "" ||
      description === "" ||
      answers.includes("") ||
      choices.includes("")
    ) {
      alert("Please fill in all fields");
      return;
    }
    console.log("Name:", name);
    console.log("Description:", description);
    console.log("Reward:", reward);
    console.log("Answers:", answers);
    console.log("Choices:", choices);
    try {
      const res = axios.post(`${server_url}/api/problems`, {
        name,
        description,
        answers,
        choices,
        reward,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box width="100%" p={4}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="start">
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Answers</FormLabel>
            <VStack spacing={2}>
              {answers.map((answer, index) => (
                <Input
                  key={index}
                  placeholder={`Answer ${index + 1}`}
                  value={answer}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                />
              ))}
            </VStack>
          </FormControl>

          <FormControl>
            <FormLabel>Choices</FormLabel>
            <VStack spacing={2}>
              {choices.map((choice, index) => (
                <Input
                  key={index}
                  placeholder={`Choice ${index + 1}`}
                  value={choice}
                  onChange={(e) => handleChoiceChange(index, e.target.value)}
                />
              ))}
            </VStack>
          </FormControl>

          <FormControl>
            <FormLabel>Reward</FormLabel>
            <NumberInput
              value={reward}
              min={0}
              onChange={(valueString) => setReward(Number(valueString))}
            >
              <NumberInputField />
            </NumberInput>
          </FormControl>

          <Button
            type="submit"
            colorScheme="teal"
            onClick={() => router.push("/selectProblemPage")}
          >
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
}