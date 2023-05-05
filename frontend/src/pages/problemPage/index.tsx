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

export default function ProblemPage() {
  const router = useRouter();
  console.log(router.query);

  const problem = router.query.problem;
  console.log(problem);

  return (
    <>
      {problem}
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
          name
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
              description
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
              {
                // problem.choices.map((choice, index) => (
                //   <Button
                //     colorScheme={"orange"}
                //     w="100%"
                //     type="button"
                //     key={index}
                //   >
                //     {choice}
                //   </Button>
                // ))
              }
            </Grid>
          </FormControl>
        </VStack>
      </Container>
    </>
  );
}
