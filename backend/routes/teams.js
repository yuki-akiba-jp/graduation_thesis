const router = require("express").Router();
const Team = require("../models/Team");

router.get("/", async (req, res) => {
  const teams = await Team.find();
  console.log(teams);
  return res.status(200).json(teams);
});

async function isTeamNameValid(name) {
  const teams = await Team.find();
  const names = teams.map((team) => team.name);
  if (names.includes(name)) return false;
  return true;
}
router.post("/", async (req, res) => {
  try {
    if (!isTeamNameValid(req.body.name))
      return res.status(400).json("team already exists");
    const newTeam = new Team({
      name: req.body.name,
      score: 0,
      players: [],
    });
    const team = await newTeam.save();
    return res.status(200).json(team);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.put("/joinTeam", async (req, res) => {
  try {
    if (!isTeamNameValid(req.body.name))
      return res.status(400).json("team already exists");
    const team = await Team.findOne({ name: req.body.name });
    console.log(team);
    // if (!team) return res.status(400).json("team not found");
    console.log(req.body.player);

    // const newTeam = await Team.updateOne(
    //   { name: req.body.name },
    //   {
    //     $push: { players: req.body.player },
    //   },
    // );
    // console.log("newteam", newTeam);
    return res.status(200).json("ok");
  } catch (err) {
    return res.status(500).json(err);
  }
});
router.put("/deleteTeam", async (req, res) => {
  try {
    const team = await Team.deleteOne({ name: req.body.name });
    // const del = await Team.deleteMany({ name: req.body.name });
    return res.status(200).json("ok");
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.delete("/", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      res.status(200).json("account has been deleted");
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("you can delete only your account");
  }
});

module.exports = router;
