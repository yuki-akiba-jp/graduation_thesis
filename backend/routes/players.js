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

// router.put("/joinTeam", async (req, res) => {
//   try {
//     const player = await Player.findOne({ name: req.body.name });
//     if (!player) return res.status(400).json("player does not exist");
//     const player = new Player({
//       name: req.body.playerName,
//       teamName: req.body.name,
//     });

//     const oldTeam = await Team.findOneAndUpdate(
//       { name: req.body.name },
//       { $pull: { players: player } },
//       { new: true }
//     );
//     console.log("oldteam", oldTeam);

//     const newTeam = await Team.findOneAndUpdate(
//       { name: req.body.name },
//       { $push: { players: player } },
//       { new: true }
//     );
//     console.log("newteam", newTeam);

//     return res.status(200).json("ok");
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json(err);
//   }
// });
// router.put("/deleteTeam", async (req, res) => {
//   try {
//     const team = await Team.deleteOne({ name: req.body.name });
//     const del = await Team.deleteMany({ name: req.body.name });
//     return res.status(200).json("ok");
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// });

// router.delete("/", async (req, res) => {
//   if (req.body.userId === req.params.id || req.body.isAdmin) {
//     try {
//       res.status(200).json("account has been deleted");
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json(err);
//     }
//   } else {
//     return res.status(403).json("you can delete only your account");
//   }
// });

module.exports = router;
