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
        let teamsForRanking = teams.map((team) => {
          let teamForRanking = {
            name: team.name,
            score: team.score,
            players: team.players,
          };
          return teamForRanking;
        });

        return res.status(200).json(teamsForRanking);
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
