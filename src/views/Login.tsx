import React, { useContext } from "react";
import { Button, ButtonGroup, Center, Flex, Text } from "@chakra-ui/react";

import { LoginWithGoogle } from "../firebase/auth";
import NotifyContext from "../context/notify";

const LoginView: React.FC = () => {
  const notify = useContext(NotifyContext);
  const AuthGoogle = async () => {
    try {
      await LoginWithGoogle();
      notify.NewAlert({ msg: "Authenticated", status: "success" });
    } catch (error) {
      notify.NewAlert({
        msg: "Error occured while authenticating",
        description: error.message,
        status: "error",
      });
    }
  };

  return (
    <Center w="100vw" h="100vh">
      <Flex
        direction="column"
        justify="center"
        align="center"
        width="350px"
        boxShadow="lg"
        rounded="lg"
        backgroundColor="white"
        py={7}
      >
        <Text align="center" paddingY="2" fontSize="lg">
          Join with EIES-QnA with
        </Text>

        <ButtonGroup>
          <Button colorScheme="red" onClick={AuthGoogle}>
            Google
          </Button>
          <Button colorScheme="blue" disabled>
            Facebook
          </Button>
        </ButtonGroup>
      </Flex>
    </Center>
  );
};

export default LoginView;
