"use client";
import { Button, Link } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { userIdStrage } from "@/const";

import { Flex, Box, Heading, Text } from "@chakra-ui/react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
  }, [router]);
  return (
    <>
      <Flex direction="column" align="center" justify="center" height="100vh">
        <Box textAlign="center">
          <Heading as="h1" size="2xl" marginBottom="1rem">
            サイバーセキュリティの世界へようこそ
          </Heading>
          <Text fontSize="xl" marginBottom="2rem">
            腕試しをしてみよう
          </Text>
          <Button colorScheme="blue" size="lg">
            <Link href="/enterNamePage">Start app</Link>
          </Button>
        </Box>
      </Flex>
    </>
  );
}
