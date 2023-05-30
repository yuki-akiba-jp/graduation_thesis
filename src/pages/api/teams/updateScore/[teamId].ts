import dbConnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import Team from "../../../../models/Team";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { teamId, problemId },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "PUT":
      try {
        const team = await Team.findById(teamId);
        let updatedScore = 0;
        team?.problems.forEach((problem) => {
          if (problem.selectedChoice === problem.answer)
            updatedScore += problem.reward;
        });

        const updatedTeam = await Team.updateOne(
          { _id: teamId },
          { $set: { score: updatedScore } },
          { new: true }
        );
        return res.status(200).json(updatedTeam);
      } catch (err) {
        return res.status(500).json(err);
      }
    default:
      return res.status(400).json("not allowed method");
  }
};

export default handler;
