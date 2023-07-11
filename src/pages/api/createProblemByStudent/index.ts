import dbConnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import ProblemByStudent from "@/models/ProblemByStudent";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body: {
      studentName,
      studentId,
      problemName,
      description,
      decisionSkill,
      answers,
      choices,
    },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const problemByStudent = new ProblemByStudent({
          studentName: studentName,
          studentId: studentId,
          problemName: problemName,
          description: description,
          decisionSkill: decisionSkill,
          answers: answers,
          choices: choices,
        });

        const isSaved = await problemByStudent.save();
        console.log(isSaved);
        return res.status(200).json(problemByStudent);
      } catch (err) {
        return res.status(500).json(err);
      }
    default:
      return res.status(400).json("not allowed method");
  }
};

export default handler;
