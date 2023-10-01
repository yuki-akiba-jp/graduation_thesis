import { Button, Link } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
          <Box>
            <Button colorScheme="gray" size="lg" m={2}>
              <Link href="/tutorial">使い方を見る</Link>
            </Button>
            <Button colorScheme="orange" size="lg" m={2}>
              <Link href="/enterNamePage">アプリを始める</Link>
            </Button>
            {/* 
            <Button colorScheme="blue" size="lg">
              <Link href="/createProblemPage">問題登録</Link>
            </Button>
            */}
          </Box>
        </Box>
      </Flex>
    </>
  );
}
