import React, { useContext } from "react";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";

import NotifyContext from "../context/notify";
import { AuthGetUsername, LogOut } from "../firebase/auth";

const Topbar: React.FC = () => {
  const notify = useContext(NotifyContext);

  const HandleSignout = async () => {
    try {
      await LogOut();
      notify.NewAlert({ msg: "Logout Successfully", status: "success" });
    } catch (error) {
      notify.NewAlert({
        msg: "Error occured while logging out",
        description: error,
        status: "error",
      });
    }
  };
  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        paddingX="35px"
        paddingY="15px"
        shadow="sm"
      >
        <Heading size="md">EIES QNA</Heading>

        <Flex direction="row" align="center">
          <Text mr="10px">{AuthGetUsername()}</Text>
          <Button onClick={HandleSignout}>Signout</Button>
        </Flex>
      </Flex>
    </>
  );
};

export default Topbar;
