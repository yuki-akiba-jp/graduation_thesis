import dbConnect from "@/lib/dbConnect";
import ProblemByStudent from "@/models/ProblemByStudent";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const problems = await ProblemByStudent.find();
        return res.status(200).json(problems);
      } catch (err) {
        return res.status(500).json(err);
      }
    default:
      return res.status(400).json("not allowed method");
  }
};

export default handler;
