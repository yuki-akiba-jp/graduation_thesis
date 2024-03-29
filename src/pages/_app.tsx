import type { AppProps } from "next/app";
import { ChakraProvider, Box, Flex } from "@chakra-ui/react";
import Head from "next/head";
import Header from "@/components/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>security-ctf-app</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider>
        <Flex direction="column" minH="100vh">
          <Header />
          <Box as="main" flex="1" w="100vw">
            <Component {...pageProps} />
          </Box>
        </Flex>
      </ChakraProvider>
    </>
  );
}
