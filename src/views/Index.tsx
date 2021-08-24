import React from "react";
import {
  Button,
  Container,
  Divider,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";

import Topbar from "../components/topbar";
import NewQuestionBox from "../components/newquiz";
import QuizCard from "../components/quiz";

const HomeView: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Topbar />
      <NewQuestionBox isOpen={isOpen} onClose={onClose} />
      <Flex mt="35px">
        <Container maxW="xl">
          <Button colorScheme="teal" onClick={onOpen}>
            Ask a new question
          </Button>
          <Divider my="15px" />
          <QuizCard />
          <QuizCard />
        </Container>
      </Flex>
    </>
  );
};

export default HomeView;
