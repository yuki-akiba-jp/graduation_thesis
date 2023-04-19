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
} from "@chakra-ui/react";
import React from "react";

export default function SelectProblemFieldPage() {
  const problemFields = [
    "sns",
    "network",
    "less communication",
    "arp",
    "account volnerability",
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
        {problemFields.map((field) => (
          <FieldPanel fieldName={field} />
        ))}
      </Grid>
    </>
  );
}

function FieldPanel({ fieldName }) {
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
        {fieldName}
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
          <Button colorScheme={"orange"} w="100%" type="button">
            Enter room
          </Button>
        </FormControl>
      </VStack>
    </Container>
  );
}
