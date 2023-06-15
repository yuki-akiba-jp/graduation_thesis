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
    case "GET":
      try {
        const team = await Team.findById(teamId);
        const problems = team?.problems;
        return res.status(200).json(problems);
      } catch (err) {
        return res.status(500).json(err);
      }
    default:
      return res.status(400).json("not allowed method");
  }
};

export default handler;
