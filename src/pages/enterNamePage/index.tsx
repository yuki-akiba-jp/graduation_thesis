import { FormEvent, ChangeEvent, useState, useEffect } from "react";
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
import { useRouter } from "next/router";
import { userIdStrage } from "@/const";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export default function EnterNamePage() {
  const [name, setName] = useState<string>("");
  const router = useRouter();
  const inputref = React.useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputref.current?.focus();
  }, []);

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
          ニックネームを入れてね
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
              ref={inputref}
              variant={"solid"}
              borderWidth={1}
              color={"gray.800"}
              _placeholder={{
                color: "gray.400",
              }}
              borderColor={useColorModeValue("gray.300", "gray.700")}
              required
              placeholder={"Your Nickname"}
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              autoFocus
            />
          </FormControl>
          <FormControl w={{ base: "100%", md: "40%" }}>
            <Button
              colorScheme={"orange"}
              w="100%"
              type="button"
              onClick={async () => {
                try {
                  const res = await axios.post(`/api/players`, {
                    name: name,
                  });
                  localStorage.setItem(userIdStrage, res.data._id);
                  router.push({
                    pathname: "/selectTeamPage",
                  });
                } catch (err: any) {
                  if (err.response.status === 400) {
                    if (name.length < 3 || name.length > 20)
                      alert("name should be between 3 and 20 characters");
                    else alert("this name already exists");
                  }
                  console.log(err);
                }
              }}
            >
              Enter
            </Button>
          </FormControl>
        </VStack>
        ※Enterを押した後、数秒時間がかかる場合があります。
      </Container>
    </Flex>
  );
}

