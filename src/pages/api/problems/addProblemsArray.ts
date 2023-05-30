import dbConnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import Problem from "../../../models/Problem";
import { problemsArray } from "../problemsArray";

 const handler =  async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        problemsArray.map(async (problem) => {
          const newProblem = await new Problem({
            name: problem.name,
            description: problem.description,
            answer: problem.answer,
            choices: problem.choices,
            selectedChoice: problem.selectedChoice,
            reward: problem.reward,
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