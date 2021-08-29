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
          <Flex justify="space-between" flexGrow={1}>
            <Text>{username}</Text>
            <Text fontSize="sm" color="gray" align="right">
              {time}
            </Text>
          </Flex>
        </HStack>
        <Text>{question}</Text>
      </Flex>
    </>
  );
};

export default QuizCard;
