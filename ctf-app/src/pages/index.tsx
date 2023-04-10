import { Box } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import { Header } from "../components/Header";

import { Stack } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Header />
      <VStack>
        <Box m={2} color="red.500">
          Tomato
        </Box>
        <Box m={2} color="red.500">
          Tomato
        </Box>
      </VStack>
    </>
  );
}
