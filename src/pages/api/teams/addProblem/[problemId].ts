import dbConnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import Team from "../../../../models/Team";
import Problem from "../../../../models/Problem";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { problemId },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const teams = await Team.find();
        const problem = await Problem.findById(problemId);
        teams.map(async (team) => {
          const updatedTeam = await Team.updateOne(
            { _id: team._id },
            { $push: { problems: problem } },
            { new: true }
          );
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