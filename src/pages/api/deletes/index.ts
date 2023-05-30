import dbConnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import Team from "../../../models/Team";
import Player from "../../../models/Player";
import Problem from "../../../models/Problem";

const handler =   async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "DELETE":
      try {
        await Promise.all([
          Team.deleteMany({}),
          Player.deleteMany({}),
          Problem.deleteMany({}),
        ]);
        res.status(200).json("account has been deleted");
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      break;
    default:
      return res.status(400).json("not allowed method");
  }
};

export default handler;