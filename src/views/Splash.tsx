import React from "react";
import { Flex, Heading, Spinner } from "@chakra-ui/react";

const Splash: React.FC = () => {
  return (
    <Flex
      w="100vw"
      h="100vh"
      justify="center"
      align="center"
      direction="column"
    >
      <Heading size="md" mb={4}>
        EIES QnA
      </Heading>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="teal"
        size="xl"
      />
    </Flex>
  );
};

export default Splash;
