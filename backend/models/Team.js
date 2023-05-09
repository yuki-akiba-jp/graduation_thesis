const mongoose = require("mongoose");
const Player = require("./Player");
const Problem = require("./Problem");
const TeamSchema = new mongoose.Schema({
    name: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
  score: Number,
  players: [Player.schema],
  problems: [Problem.schema]
});

const Team = mongoose.model("Team", TeamSchema);
module.exports = Team;
