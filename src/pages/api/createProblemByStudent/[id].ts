import dbConnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";

import ProblemByStudent from "@/models/ProblemByStudent";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const problem = await ProblemByStudent.findById(id);
        console.log(problem);
        return res.status(200).json(problem);
      } catch (err) {
        return res.status(500).json(err);
      }
    default:
      return res.status(400).json("not allowed method");
  }
};

export default handler;
