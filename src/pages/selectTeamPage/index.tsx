import { FormEvent, ChangeEvent, useState, useEffect, Fragment } from "react";
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
  HStack, GridItem, Spacer,
} from "@chakra-ui/react";
import React from "react";

export default function SelectTeamPage() {
  const [name, setName] = useState<string>("");
  const teams = [
    "one team",
    "two team",
    "three team",
    "four team",
    "five team",
  ];

  return (
    <>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3,1fr)",
        }}
        gap={6}
        m={10}
      >
        {teams.map((team) => (
          <TeamPanel teamName={team} />
        ))}
      </Grid>
    </>
  );
}

function TeamPanel({ teamName }) {
  return (
    <Container
      maxW={{ base: "sm", md: "xl" }}
      bg={useColorModeValue("gray", "blue.100")}
      boxShadow={"xl"}
      rounded={"lg"}
      p={30}
    >
      <Heading
        as={"h2"}
        fontSize={{ base: "xl", sm: "2xl" }}
        textAlign={"center"}
        mb={5}
      >
        {teamName}
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
            onClick={() => handleClickEnter()}
          >
            Enter room
          </Button>
        </FormControl>
      </VStack>
    </Container>
  );
}

function handleClickEnter() {
  console.log("Link clicked");
}

function MyComponent() {
  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      templateRows="repeat(3, 1fr)"
      gap="4"
    >
      {[...Array(9)].map((_, i) => (
        <GridItem
          key={i}
          backgroundColor="gray.200"
          p="4"
          alignContent={"center"}
        >
          Panel {i + 1}
        </GridItem>
      ))}
    </Grid>
  );
}
