import mongoose, { Document, Model } from "mongoose";

export interface IProblemByStudent {
  studentName: string;
  studentId: string;
  problemName: string;
  description: string;
  decisionSkill: string[];
  answers: string[];
  choices: string[];
}

export interface ProblemByStudentDocument extends IProblemByStudent, Document {}

const ProblemByStudentSchema = new mongoose.Schema<ProblemByStudentDocument>({
  studentName: { type: String, required: true },
  studentId: { type: String, required: true },
  problemName: { type: String, required: true },
  description: { type: String, required: true },
  decisionSkill: { type: [String], required: true },
  answers: { type: [String], required: true },
  choices: { type: [String], required: true },
});

let ProblemByStudent: Model<ProblemByStudentDocument>;

if (mongoose.models.ProblemByStudent) {
  ProblemByStudent =
    mongoose.model<ProblemByStudentDocument>("ProblemByStudent");
} else {
  ProblemByStudent = mongoose.model<ProblemByStudentDocument>(
    "ProblemByStudent",
    ProblemByStudentSchema
  );
}

export default ProblemByStudent;
