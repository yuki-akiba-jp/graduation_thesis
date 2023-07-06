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
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function CreateProblemPage() {
  const router = useRouter();
  const [name, setName] = useState<string>("氏名");
  const [studentId, setStudentId] = useState<string>("");
  const [answers, setAnswers] = useState<string[]>(["", "", ""]);
  const [choices, setChoices] = useState<string[]>(["", "", "", "", ""]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      name === "" ||
      studentId === "" ||
      answers.includes("") ||
      choices.includes("")
    ) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const res = await axios.post(`/api/problems`, {
        name,
        studentId,
        answers,
        choices,
      });
      const problemId = res.data._id;
      const updateteams = await axios.put(`/api/teams/addProblem/${problemId}`);
      console.log(updateteams.data);
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
            <FormLabel>学籍番号</FormLabel>
            <Input
              placeholder=""
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
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
