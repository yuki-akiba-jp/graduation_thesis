import mongoose from "mongoose";

const ProblemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  answers: { type: [String], required: true },
  choices: { type: [String], required: true },
  reward: { type: Number, required: true },
});

const Problem = mongoose.model("Problem", ProblemSchema);

module.exports = Problem;
