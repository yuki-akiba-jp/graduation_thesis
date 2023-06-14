import dbConnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import Team from "../../../models/Team";
import Problem from "../../../models/Problem";

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
        let names: string[] = teams.map((team) => team.name);
        return res.status(200).json(names);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }

    default:
      return res.status(400).json("not allowed method");
  }
};
export default handler;
