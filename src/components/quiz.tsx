import React from "react";
import { Avatar, Flex, HStack, Text } from "@chakra-ui/react";

interface quizProps {
  question: string;
  username: string;
  photoUrl?: string | null;
  time?: string;
}

const QuizCard: React.FC<quizProps> = ({
  question,
  username,
  photoUrl,
  time,
}) => {
  return (
    <>
      <Flex
        direction="column"
        shadow="sm"
        rounded="lg"
        paddingY="25px"
        paddingX="35px"
      >
        <HStack>
          <Avatar size="sm" name={username} src={photoUrl || undefined} />
          <Text>{username}</Text>
          <Text fontSize="sm" color="gray">
            {time}
          </Text>
        </HStack>
        <Text>{question}</Text>
      </Flex>
    </>
  );
};

export default QuizCard;
