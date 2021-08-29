import { Container, Divider, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";

const Footer: React.FC = () => {
  return (
    <Container minW="100vw" mt="auto">
      <Divider />
      <Flex
        justify="space-between"
        align="center"
        paddingY={4}
        paddingX={{ base: "15px", md: "25px", lg: "35px" }}
      >
        <Text color="gray" fontSize="sm" textAlign="left">
          by{" "}
          <Link color="teal" href="https://charukahs.com/" isExternal>
            charukahs
          </Link>
          , made with ❤ and ☕
        </Text>
        <Text color="gray" fontSize="sm" textAlign="right">
          View on{" "}
          <Link
            color="teal"
            href="https://github.com/CharukaHS/firebase-qna/"
            isExternal
          >
            Github
          </Link>
        </Text>
      </Flex>
    </Container>
  );
};

export default Footer;
