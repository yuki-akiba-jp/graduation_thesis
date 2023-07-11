import { useState, useEffect } from "react";
import { Stack } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
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
import { studentLoginStrage } from "@/const";

export default function CreateProblemPage() {
  const router = useRouter();
  const [studentName, setStudentName] = useState<string>("");
  const [problemName, setProblemName] = useState<string>("");
  const [studentId, setStudentId] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [decisionSkill, setDicisionSkill] = useState<string>("");
  const answersPlaceHolder = [
    "メールを無視する",
    "メールを削除する",
    "送信者をブロックする",
  ];
  const choicesPlaceHolder = [
    "リンクをクリックしてサイトを確認する",
    "返信して送信者が誰か確認する",
    "リンクをコピーして友達に送る",
    "メールを親に転送する",
    "親と一緒にリンクをクリックする",
  ];

  const [answers, setAnswers] = useState<string[]>(["", "", ""]);
  const [choices, setChoices] = useState<string[]>(["", "", "", "", ""]);
  const [studentLoginStrageItem, setStudentLoginStrageItem] = useState<
    string | null
  >("");
  useEffect(() => {
    setStudentLoginStrageItem(localStorage.getItem(studentLoginStrage));
  }, []);

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
      studentName === "" ||
      studentId === "" ||
      problemName === "" ||
      decisionSkill === "" ||
      answers.includes("") ||
      choices.includes("")
    ) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const res = await axios.post(`/api/createProblemByStudent`, {
        studentName,
        studentId,
        problemName,
        description,
        decisionSkill,
        answers,
        choices,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {process.env.NEXT_PUBLIC_CREATEPROBLEM_PASSWORD !==
        studentLoginStrageItem && <LoginModal />}
      <Box width="100%" p={4}>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="start">
            <FormControl>
              <FormLabel>イニシャル</FormLabel>
              <Input
                placeholder="M.C"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>学籍番号</FormLabel>
              <Input
                placeholder="2000000"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>問題名</FormLabel>
              <Input
                value={problemName}
                placeholder="フィッシング🐟"
                onChange={(e) => setProblemName(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>判断スキル</FormLabel>
              <Input
                value={decisionSkill}
                placeholder="メール内に含まれるリンクをクリックする前に、そのリンク先が安全なウェブサイトであるかどうかを確認する"
                onChange={(e) => setDicisionSkill(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>問題文</FormLabel>
              <Input
                value={description}
                placeholder="知らない宛先からメールが届いた。メールにはURLのリンクが貼られている。どうする？"
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Answers</FormLabel>
              <VStack spacing={2}>
                {answers.map((answer, index) => (
                  <Input
                    key={index}
                    placeholder={answersPlaceHolder[index]}
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
                    placeholder={choicesPlaceHolder[index]}
                    value={choice}
                    onChange={(e) => handleChoiceChange(index, e.target.value)}
                  />
                ))}
              </VStack>
            </FormControl>

            <Stack direction="row" spacing={4} align="center">
              <Button
                type="submit"
                colorScheme="teal"
                onClick={() => alert("問題を登録しました")}
              >
                問題を登録
              </Button>
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
    </>
  );
}

function LoginModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputPassword, setInputPassword] = useState<string>("");
  useEffect(() => {
    onOpen();
  }, [onOpen]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="text"
                placeholder="Enter Password"
                onChange={(e) => {
                  setInputPassword(e.target.value);
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                localStorage.setItem(studentLoginStrage, inputPassword);
                onClose();
              }}
            >
              Login
            </Button>
            <Button variant="ghost">Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
