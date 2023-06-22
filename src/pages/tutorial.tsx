import { Button, Link } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { Flex, Box, Heading, Text, Image } from "@chakra-ui/react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
  }, [router]);
  return (
    <>
      <Flex direction="column" align="center" justify="center" height="100vh">
        <Box textAlign="center">
          <Text fontSize="xl" marginBottom="2rem">
            このアプリは、チームでクイズを解くアプリです。
            メンバーと協力して、より多くの問題を解きましょう。
          </Text>
          <Text fontSize="xl" marginBottom="2rem">
            ルール:
            各問の解答回数は2回までです。一回間違えても、次に正解すれば得点は入ります。
          </Text>

          <Button colorScheme="orange" size="lg">
            <Link href="/enterNamePage">アプリを始める</Link>
          </Button>
        </Box>
      </Flex>
    </>
  );
}
