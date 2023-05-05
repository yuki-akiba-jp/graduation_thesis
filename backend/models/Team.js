const Player = require("./Player");

const mongoose = require("mongoose");
const TeamSchema = new mongoose.Schema({
  name: String,
  score: Number,
  players: [Player.schema],
});

const Team = mongoose.model("Team", TeamSchema);
module.exports = Team;
