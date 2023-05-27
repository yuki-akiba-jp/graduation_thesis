import dbConnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import Team from "../../../../../models/Team";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { teamId, problemId },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "PUT":
      try {
        const updatedTeam = await Team.updateOne(
          { _id: teamId, "problems._id": problemId },
          {
            $set: {
              "problems.$.selectedChoice": req.body.selectedChoice,
            },
          },
          { new: true }
        );

        const team = await Team.findById(teamId);

        return res.status(200).json(team);
      } catch (err) {
        return res.status(500).json(err);
      }
    default:
      return res.status(400).json("not allowed method");
  }
};
