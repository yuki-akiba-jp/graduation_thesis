import dbConnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import Team from "../../../../../models/Team";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { teamId, problemId },
    body: { selectedChoice, answerTime, isFirstAnswer },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "PUT":
      try {
        let updateQuery: any = {
          $set: {
            "problems.$.selectedChoice": selectedChoice,
          },
          $inc: {
            "problems.$.answerCount": 1,
          },
        };
        if (isFirstAnswer)
          updateQuery.$set["problems.$.firstAnswerTime"] = answerTime;
        else updateQuery.$set["problems.$.secondAnswerTime"] = answerTime;

        const updatedTeam = await Team.updateOne(
          { _id: teamId, "problems._id": problemId },
          updateQuery,
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

export default handler;
