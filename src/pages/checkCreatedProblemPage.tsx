import { useState, useEffect } from "react";
import { Stack } from "@chakra-ui/react";
import {
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
import { studentCreatedProblemId, studentLoginStrage } from "@/const";
import { ProblemByStudentDocument } from "@/models/ProblemByStudent";

export default function CreateProblemPage() {
  const router = useRouter();
  const [problem, setProblem] = useState<ProblemByStudentDocument>();
  useEffect(() => {
    const getProblem = async () => {
      const res = await axios.get(
        `/api/createProblemByStudent/${localStorage.getItem(
          studentCreatedProblemId
        )}`
      );
      setProblem(res.data);
    };
    getProblem();
  }, []);

  return (
    <>
      {problem && (
        <Box width="100%" p={4}>
          <form>
            <VStack spacing={4} align="start">
              <FormControl>
                <FormLabel>イニシャル</FormLabel>
                <Input value={problem?.studentName} />
              </FormControl>

              <FormControl>
                <FormLabel>学籍番号</FormLabel>
                <Input value={problem?.studentId} />
              </FormControl>

              <FormControl>
                <FormLabel>問題名</FormLabel>
                <Input value={problem?.problemName} />
              </FormControl>

              <FormControl>
                <FormLabel>判断スキル</FormLabel>
                <Input value={problem?.decisionSkill} />
              </FormControl>

              <FormControl>
                <FormLabel>問題文</FormLabel>
                <Input value={problem?.description} />
              </FormControl>

              <FormControl>
                <FormLabel>Answers</FormLabel>
                <VStack spacing={2}>
                  {problem?.answers.map((answer, index) => (
                    <Input key={index} value={answer} />
                  ))}
                </VStack>
              </FormControl>

              <FormControl>
                <FormLabel>Choices</FormLabel>
                <VStack spacing={2}>
                  {problem?.choices.map((choice, index) => (
                    <Input key={index} value={choice} />
                  ))}
                </VStack>
              </FormControl>

              <Stack direction="row" spacing={4} align="center">
                <Button
                  onClick={() => {
                    router.push("/createdProblemsPage");
                  }}
                >
                  登録された問題一覧
                </Button>
              </Stack>
            </VStack>
          </form>
        </Box>
      )}
    </>
  );
}
