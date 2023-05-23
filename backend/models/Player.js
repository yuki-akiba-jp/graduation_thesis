const mongoose = require("mongoose");
const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    min: 3,
    max: 20,
    // unique: true,
  },
  score: Number,
  teamName: {
    type: String,
    require: true,
    min: 3,
    max: 20,
  },
});

const Player = mongoose.model("Player", PlayerSchema);

module.exports = Player;
