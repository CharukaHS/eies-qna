import React from "react";
import { Box, Center, Container, Text } from "@chakra-ui/react";

const LoginView: React.FC = () => {
  return (
    <Center w="100vw" h="100vh">
      <Container width="350px">
        <Text align="center" paddingY="2" fontSize="lg">
          Login
        </Text>
        <Box
          backgroundColor="white"
          paddingY="2"
          paddingX="4"
          boxShadow="lg"
          rounded="lg"
        >
          <Text>Facebook</Text>
        </Box>
      </Container>
    </Center>
  );
};

export default LoginView;
