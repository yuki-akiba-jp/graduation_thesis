const router = require("express").Router();
const Player = require("../models/Player");

router.get("/all", async (req, res) => {
  const players = await Player.find();
  return res.status(200).json(players);
});
router.get("/:id", async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    return res.status(200).json(player);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

async function isPlayerNameValid(name) {
  const players = await Player.find();
  const names = players.map((player) => player.name);
  if (names.includes(name)) return false;
  if (name.length < 3 || name.length > 20) return false;
  return true;
}
router.post("/", async (req, res) => {
  try {
    if (!(await isPlayerNameValid(req.body.name)))
      return res.status(400).json("player already exists");
    const newPlayer = new Player({
      name: req.body.name,
      score: 0,
      teamName: "",
    });
    const player = await newPlayer.save();
    return res.status(200).json(player);
    // return res.status(200).json(newPlayer);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
