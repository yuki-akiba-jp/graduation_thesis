import { Button, Link, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { Flex, Box, Heading, Text, Image } from "@chakra-ui/react";

export default function Home() {
  const router = useRouter();

  const fontSize = useBreakpointValue({ base: "md", md: "xl" });
  const marginBottom = useBreakpointValue({ base: "1rem", md: "2rem" });

  useEffect(() => {
    if (!router.isReady) return;
  }, [router]);

  return (
    <>
      <Flex direction="column" align="center" justify="center" height="100vh">
        <Box textAlign="center">
          <Text fontSize={fontSize} marginBottom={marginBottom}>
            このアプリは、チームでクイズを解くアプリです。
            メンバーと協力して、より多くの問題を解きましょう。
          </Text>
          <Text fontSize={fontSize} marginBottom={marginBottom}>
            ルール:
            各問の解答回数は2回までです。一回間違えても、次に正解すれば得点は入ります。
          </Text>
          <Button colorScheme="orange" size="lg" marginRight={3}>
            <Link href="/enterNamePage">チュートリアルを始める</Link>
          </Button>

          <Button colorScheme="orange" size="lg">
            <Link href="/enterNamePage">アプリを始める</Link>
          </Button>
        </Box>
      </Flex>
    </>
  );
}
