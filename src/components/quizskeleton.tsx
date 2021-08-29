import React from "react";
import {
  Flex,
  HStack,
  SkeletonCircle,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";

const QuizCardSkeleton: React.FC = () => {
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
          <SkeletonCircle size="10" mr={4} />
          <Skeleton height="0.5rem" w="50%" />
        </HStack>
        <SkeletonText noOfLines={2} spacing={4} mt={4} />
      </Flex>
    </>
  );
};

export default QuizCardSkeleton;
