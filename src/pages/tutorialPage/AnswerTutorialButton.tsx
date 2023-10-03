import React from "react";
import { Button } from "@chakra-ui/react";
import _ from "lodash";

export const AnswerTutorialButton = ({
  onOpen,
  problem,
  setProblem,
}: {
  onOpen: () => void;
  problem: any;
  setProblem: any;
}) => {
  const handleClick = async () => {
    if (problem.selectedChoice === "") return;
    setProblem((problem: any) => {
      const newProblem = _.cloneDeep(problem);
      newProblem.answerCount += 1;
      return newProblem;
    });
    onOpen();
  };

  return (
    <Button
      colorScheme="teal"
      w="30%"
      type="button"
      onClick={handleClick}
      isTruncated
    >
      解答する
    </Button>
  );
};
