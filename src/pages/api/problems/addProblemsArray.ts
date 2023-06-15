import dbConnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import Problem from "../../../models/Problem";
import { problemsArray } from "../problemsArray";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        problemsArray.map(async (problem) => {
          const shuffledChoices = shuffleArray([
            problem.answer,
            ...problem.choices,
          ]);
          const newProblem = await new Problem({
            name: problem.name,
            description: problem.description,
            answer: problem.answer,
            choices: shuffledChoices,
            selectedChoice: problem.selectedChoice,
            reward: problem.reward,
            answerCount: 0,
            answerCountLimit: 2,
          });
          await newProblem.save();
        });

        return res.status(200).json("ok");
      } catch (err) {
        return res.status(500).json(err);
      }

    default:
      return res.status(400).json("not allowed method");
  }
};

export default handler;

function shuffleArray(array: string[]): string[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}
