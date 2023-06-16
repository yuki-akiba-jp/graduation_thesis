import dbConnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import Team from "../../../models/Team";
import Problem, { ProblemDocument } from "../../../models/Problem";
import { problemsArray } from "../problemsArray";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { teamId, problemId },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const teams = await Team.find();
        return res.status(200).json(teams);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    case "POST":
      try {
        if (!(await isTeamNameValid(req.body.name)))
          return res.status(400).json("invalid");

        //change this line to create problems from array
        const problems: ProblemDocument[] = [];

        problemsArray.map(async (problem) => {
          const toUseChoices = shuffleArray(problem.choices).slice(0, 3);
          const answerIndex = Math.floor(
            Math.random() * problem.answers.length
          );

          const toUseAnswer = problem.answers[answerIndex];

          const shuffledChoices = shuffleArray([toUseAnswer, ...toUseChoices]);
          console.log(shuffledChoices);
          const newProblem = new Problem({
            name: problem.name,
            description: problem.description,
            answer: toUseAnswer,
            choices: shuffledChoices,
            selectedChoice: problem.selectedChoice,
            reward: problem.reward,
            answerCount: 0,
            answerCountLimit: 2,
          });
          problems.push(newProblem);
        });
        problems.sort((a, b) => a.reward - b.reward);

        const newTeam = new Team({
          name: req.body.name,
          score: 0,
          players: [],
          problems: problems,
        });
        const team = await newTeam.save();
        return res.status(200).json(team);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }

    default:
      return res.status(400).json("not allowed method");
  }
};

async function isTeamNameValid(name: string) {
  const teams = await Team.find();
  const names = teams.map((team) => team.name);
  if (names.includes(name)) return false;
  if (name.length < 3 || name.length > 20) return false;
  return true;
}

export default handler;

function shuffleArray(array: string[]): string[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}
