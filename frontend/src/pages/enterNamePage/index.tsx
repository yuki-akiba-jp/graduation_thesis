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
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userNameState, teamNameState } from "@/recoilStates";
import axios from "axios";

const server_url =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
export default function EnterNamePage() {
  const [name, setName] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("userName", name);
  }, [name]);

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
              onClick={async () => {
                try {
                  const res = await axios.post(`${server_url}/api/players`, {
                    name: name,
                  });
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
      </Container>
    </Flex>
  );
}
