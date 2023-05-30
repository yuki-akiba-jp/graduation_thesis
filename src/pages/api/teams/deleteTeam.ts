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
        const team = await Team.deleteOne({ name: req.body.name });
        const del = await Team.deleteMany({ name: req.body.name });
        return res.status(200).json("ok");
      } catch (err) {
        return res.status(500).json(err);
      }
    default:
      return res.status(400).json("not allowed method");
  }
};

export default handler;
