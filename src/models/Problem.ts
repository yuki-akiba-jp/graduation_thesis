import mongoose, { Document, Model } from "mongoose";

export interface IProblem {
  name: string;
  description: string;
  answer: string;
  choices: string[];
  selectedChoice?: string;
  reward: number;
  answerCount: number;
  answerCountLimit: number;
}

export interface ProblemDocument extends IProblem, Document {}

const ProblemSchema = new mongoose.Schema<ProblemDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  answer: { type: String, required: true },
  choices: { type: [String], required: true },
  selectedChoice: { type: String, required: false },
  reward: { type: Number, required: true },
  answerCount: { type: Number, required: true },
  answerCountLimit: { type: Number, required: true },
});

let Problem: Model<ProblemDocument>;

if (mongoose.models.Problem) {
  Problem = mongoose.model<ProblemDocument>("Problem");
} else {
  Problem = mongoose.model<ProblemDocument>("Problem", ProblemSchema);
}

export default Problem;
