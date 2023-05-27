import dbConnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import Player from "../../../models/Player";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        if (!(await isPlayerNameValid(req.body.name)))
          return res.status(400).json("player already exists");
        const newPlayer = new Player({
          name: req.body.name,
          score: 0,
          teamName: "not decided",
        });

        const player = await newPlayer.save();

        return res.status(200).json(player);
      } catch (err) {
        return res.status(500).json(err);
      }
    default:
      return res.status(400).json("not allowed method");
  }
};

async function isPlayerNameValid(name: string) {
  const players = await Player.find();
  const names = players.map((player) => player.name);
  if (names.includes(name)) return false;
  if (name.length < 3 || name.length > 20) return false;
  return true;
}
