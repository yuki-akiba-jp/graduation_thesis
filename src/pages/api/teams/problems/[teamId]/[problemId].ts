import dbConnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import Team from "../../../../../models/Team";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { teamId, problemId },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const team = await Team.findById(teamId);
        if (!team?.problems) {
          return res
            .status(404)
            .json({ error: "No problems found for the team" });
        }
        const problem = team.problems.find(
          (problem) => problem._id.toString() === problemId
        );
        if (!problem) {
          return res.status(404).json({ error: "Problem not found" });
        }
        return res.status(200).json(problem);
      } catch (err) {
        return res.status(500).json(err);
      }
    default:
      return res.status(400).json("not allowed method");
  }
};

export default handler;
