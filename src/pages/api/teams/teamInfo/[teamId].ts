import dbConnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import Team from "../../../../models/Team";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { teamId },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const team = await Team.findById(teamId);
        return res.status(200).json(team);
      } catch (err) {
        return res.status(500).json(err);
      }
    default:
      return res.status(400).json("not allowed method");
  }
};
