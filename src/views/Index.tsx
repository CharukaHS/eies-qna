import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Divider,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import Topbar from "../components/topbar";
import NewQuestionBox from "../components/newquiz";
import QuizCard from "../components/quiz";
import QuizCardSkeleton from "../components/quizskeleton";
import Footer from "../components/footer";

import {
  FirestoreListenToQuestions,
  QuestionType,
} from "../firebase/firestore";

const HomeView: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [questions, setquestions] = useState<QuestionType[]>([]);

  useEffect(() => {
    const unsub = FirestoreListenToQuestions(setquestions, setisLoading);
    return () => {
      unsub();
    };
  }, []);

  return (
    <Flex minH="100vh" width="100vw" direction="column">
      <Topbar />

      <NewQuestionBox isOpen={isOpen} onClose={onClose} />

      <Flex as="main" my="35px" direction="column">
        <Container maxW="xl">
          <Button colorScheme="teal" onClick={onOpen}>
            Ask a new question
          </Button>

          <Divider my="15px" />

          {/* show skeleton card if data is still fetching */}
          {isLoading && (
            <>
              <QuizCardSkeleton />
              <QuizCardSkeleton />
              <QuizCardSkeleton />
            </>
          )}

          {/* show questions */}
          {questions.map((q) => {
            return (
              <QuizCard
                key={q.docId}
                question={q.question}
                username={q.displayName}
                photoUrl={q.photoUrl}
                time={q.localtime}
              />
            );
          })}

          {/* no question message */}
          {!questions.length && !isLoading && (
            <Text align="center" color="gray">
              No questions so far, be the first one to ask a question ✨
            </Text>
          )}
        </Container>
      </Flex>

      <Footer />
    </Flex>
  );
};

export default HomeView;
