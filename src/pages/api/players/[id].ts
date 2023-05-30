import dbConnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import Player from "../../../models/Player";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const player = await Player.findById(id);
        return res.status(200).json(player);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    default:
      return res.status(400).json("not allowed method");
  }
};

export default handler;
