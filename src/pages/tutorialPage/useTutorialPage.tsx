import { useState, useEffect } from "react";
import _ from "lodash";

export interface ITutorialProblem {
  name: string;
  description: string;
  answer: string;
  choices: string[];
  selectedChoice: string;
  reward: number;
  answerCount: number;
  answerCountLimit: number;
}

function useTutorialPage() {
  const [problem, setProblem] = useState<ITutorialProblem>({
    name: "tutorial",
    description: "サトシのピカチュウの好物って、なに？",
    answer: "ケチャップ",
    choices: ["ポケモンパン", "ケチャップ", "かみなりのいし", "アンパンマン"],
    selectedChoice: "",
    reward: 10,
    answerCount: 0,
    answerCountLimit: 2,
  });

  const handleClickChoice = (choice: string) => {
    setProblem((problem) => {
      const newProblem = _.cloneDeep(problem);
      newProblem.selectedChoice = choice;
      return newProblem;
    });
  };

  return {
    problem,
    setProblem,
    handleClickChoice,
  };
}

export default useTutorialPage; // Consider exporting if you want to use it in other components
