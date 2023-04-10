import React from "react";
import { Heading, Box, Flex, Spacer, Text } from "@chakra-ui/react";

export const Header: React.FC = (props) => {
  return (
    <>
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Box p="2">
          <Heading size="md">app</Heading>
        </Box>
        <Spacer />
        <Text>In love with React & Next</Text>
        <Text>In love with React & Next</Text>
        <Text>In love with React & Next</Text>
      </Flex>
    </>
  );
};
