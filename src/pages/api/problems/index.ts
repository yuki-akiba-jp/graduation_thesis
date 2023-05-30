import dbConnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import Problem from "../../../models/Problem";

 const handler =  async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const newProblem = await new Problem({
          name: req.body.name,
          description: req.body.description,
          answer: req.body.answer,
          choices: req.body.choices,
          selectedChoice: "",
          reward: req.body.reward,
          score: 0,
        });
        const problem = await newProblem.save();
        return res.status(200).json(problem);
      } catch (err) {
        return res.status(500).json(err);
      }

    default:
      return res.status(400).json("not allowed method");
  }
};

export default handler;