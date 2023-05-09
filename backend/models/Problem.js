const mongoose = require("mongoose");
const ProblemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  answers: { type: [String], required: true },
  choices: { type: [String], required: true },
  selectableChoices: { type: [String], required: true },
  reward: { type: Number, required: true },
  isCompleted: { type: Boolean, default: false },
});

const Problem = mongoose.model("Problem", ProblemSchema);

module.exports = Problem;
