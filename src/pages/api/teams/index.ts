import dbConnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import Team from "../../../models/Team";
import Problem from "../../../models/Problem";

export default async (req: NextApiRequest, res: NextApiResponse) => {
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

        const problems = await Problem.find();
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
