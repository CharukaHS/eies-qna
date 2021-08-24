import React, { useEffect, useState } from "react";
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

import {
  FirestoreListenToQuestions,
  QuestionType,
} from "../firebase/firestore";

const HomeView: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [questions, setquestions] = useState<QuestionType[]>([]);

  useEffect(() => {
    const unsub = FirestoreListenToQuestions(setquestions);
    return () => {
      unsub();
    };
  }, []);

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
          {questions.map((q) => {
            return (
              <QuizCard
                key={q.docId}
                question={q.question}
                username={q.displayName}
                photoUrl={q.photoUrl}
              />
            );
          })}
        </Container>
      </Flex>
    </>
  );
};

export default HomeView;
