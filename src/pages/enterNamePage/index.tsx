import { FormEvent, ChangeEvent, useState } from "react";
import {
  VStack,
  FormControl,
  Input,
  Button,
  useColorModeValue,
  Heading,
  Container,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { Router } from "next/router";
import SelectTeamPage from "../selectTeamPage";

export default function EnterNamePage() {
  const [name, setName] = useState<string>("");

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Container
        maxW={"lg"}
        bg={useColorModeValue("white", "whiteAlpha.100")}
        boxShadow={"xl"}
        rounded={"lg"}
        p={6}
      >
        <Heading
          as={"h2"}
          fontSize={{ base: "xl", sm: "2xl" }}
          textAlign={"center"}
          mb={5}
        >
          Input Your Name
        </Heading>
        <VStack
          direction={{ base: "column", md: "row" }}
          as={"form"}
          spacing={"12px"}
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
          }}
        >
          <FormControl>
            <Input
              variant={"solid"}
              borderWidth={1}
              color={"gray.800"}
              _placeholder={{
                color: "gray.400",
              }}
              borderColor={useColorModeValue("gray.300", "gray.700")}
              id={"name"}
              type={"name"}
              required
              placeholder={"Your name"}
              aria-label={"Your name"}
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
          </FormControl>
          <FormControl w={{ base: "100%", md: "40%" }}>
            <Button
              colorScheme={"orange"}
              w="100%"
              type="button"
              onClick={() => handleClick(name)}
            >
              Enter
            </Button>
          </FormControl>
        </VStack>
      </Container>
    </Flex>
  );
}

function handleClick(name: string) {
  // If the name is empty, return
  try {
    if (name == "") throw new Error("Name cannot be empty");

    // If the name is not empty, go to the next page ,using react router with name state
    const router = new Router('/selectTeamPage',{name: name});
  } catch (e) {
    console.log(e);
  }
  if (name == "") {
    throw new Error("Name cannot be empty");
  }
}
