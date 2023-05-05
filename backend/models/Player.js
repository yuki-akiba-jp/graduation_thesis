const mongoose = require("mongoose");
const PlayerSchema = new mongoose.Schema({
  name: String,
  score: Number,
});

const Player = mongoose.model("Player", PlayerSchema);

module.exports = Player;
