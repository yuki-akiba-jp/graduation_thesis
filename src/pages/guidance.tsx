import React, { useEffect } from "react";
import { useRouter } from "next/router";
import {
  Button,
  Link,
  useBreakpointValue,
  Stack,
  Flex,
  Box,
  Text,
} from "@chakra-ui/react";

const AppDescription: React.FC<{
  fontSize: string | undefined;
  marginBottom: string | undefined;
}> = ({ fontSize, marginBottom }) => (
  <>
    <Text fontSize={fontSize} marginBottom={marginBottom}>
      このアプリは、チームでクイズを解くアプリです。
      メンバーと協力して、より多くの問題を解きましょう。
    </Text>
    <Text fontSize={fontSize} marginBottom={marginBottom}>
      ルール:
      各問の解答回数は2回までです。一回間違えても、次に正解すれば得点は入ります。
    </Text>
  </>
);

const AppButton: React.FC<{ href: string; width: string | undefined }> = ({
  href,
  width,
  children,
}) => (
  <Button colorScheme="orange" size="lg" width={width}>
    <Link href={href}>{children}</Link>
  </Button>
);

export default function Home() {
  const router = useRouter();

  const fontSize = useBreakpointValue({ base: "md", md: "xl" });
  const marginBottom = useBreakpointValue({ base: "1rem", md: "2rem" });
  const buttonWidth = useBreakpointValue({ base: "100%", md: "auto" });
  const stackDirection = useBreakpointValue({ base: "column", md: "row" });

  useEffect(() => {
    if (!router.isReady) return;
  }, [router]);

  return (
    <Flex direction="column" align="center" justify="center" height="100vh">
      <Box textAlign="center">
        <AppDescription fontSize={fontSize} marginBottom={marginBottom} />
        <Stack
          direction={stackDirection}
          spacing={4}
          align="center"
          justify="center"
        >
          <AppButton href="/tutorialPage" width={buttonWidth}>
            チュートリアルを始める
          </AppButton>
          <AppButton href="/enterNamePage" width={buttonWidth}>
            アプリを始める
          </AppButton>
        </Stack>
      </Box>
    </Flex>
  );
}
