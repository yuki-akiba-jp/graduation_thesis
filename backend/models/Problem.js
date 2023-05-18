const mongoose = require("mongoose");
const ProblemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  answer: { type: String, required: true },
  choices: { type: [String], required: true },
  selectedChoice: { type: String, required: false },
  reward: { type: Number, required: true },
});

const Problem = mongoose.model("Problem", ProblemSchema);

module.exports = Problem;
