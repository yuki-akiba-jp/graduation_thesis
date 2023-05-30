import dbConnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import Team from "../../../models/Team";
import Player from "../../../models/Player";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { problemId },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "PUT":
      try {
        const team = await Team.findOne({ name: req.body.name });
        if (!team) return res.status(400).json("team does not exist");

        const player = await Player.findOne({ name: req.body.playerName });

        if (player && player.teamName)
          if ((await Team.findOne({ name: player.teamName })) !== null) {
            const oldTeam = await Team.findOneAndUpdate(
              { name: player.teamName },
              { $pull: { players: player } },
              { new: true }
            );
          }
        const newPlayer = await Player.findOneAndUpdate(
          { name: req.body.playerName },
          { $set: { teamName: req.body.name } },
          { new: true }
        );

        const newTeam = await Team.findOneAndUpdate(
          { name: req.body.name },
          { $push: { players: newPlayer } },
          { new: true }
        );
        return res.status(200).json(newTeam);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    default:
      return res.status(400).json("not allowed method");
  }
};

export default handler;
