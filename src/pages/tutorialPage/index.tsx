import { FormEvent, useState, useEffect } from "react";
import _ from "lodash";
import { SubmitTutorialAnswerModal } from "./SubmitTutorialAnswerModal";
import {
  VStack,
  FormControl,
  Button,
  useColorModeValue,
  Heading,
  Container,
  Grid,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React from "react";
import useTutorialPage from "./useTutorialPage";

export default function ProblemPage() {
  const { problem, handleClickChoice } = useTutorialPage();

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
          bg={useColorModeValue("gray.300", "gray.300")}
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
          }}
          py={5}
        >
          <Heading
            as={"h1"}
            fontSize={{ base: "2xl", sm: "3xl" }}
            fontStyle={"italic"}
            textAlign={"center"}
            mb={3}
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
              {problem?.choices.map((choice, index) => (
                <Button
                  colorScheme={
                    choice === problem?.selectedChoice ? "green" : "orange"
                  }
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

            <SubmitTutorialAnswerModal problem={problem} />
          </FormControl>
        </VStack>
      </Container>
    </>
  );
}
