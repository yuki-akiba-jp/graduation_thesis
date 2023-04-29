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
  HStack,
  GridItem,
  Spacer,
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";

export default function SelectTeamPage() {
  const teams = [
    "one team",
    "two team",
    "three team",
    "four team",
    "five team",
  ];

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    console.log("query:", router.query.name);
  });

  return (
    <>
      <div>username: {router.query.name}</div>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3,1fr)",
        }}
        gap={6}
        m={10}
      >
        {teams.map((team, index) => (
          <TeamPanel teamName={team} key={index} />
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
            onClick={() => {
              router.push({
                pathname: "/selectTeamPage",
                query: { name: name, teamName: teamName },
              });
            }}
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
