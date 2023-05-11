const router = require("express").Router();
const Team = require("../models/Team");
const Player = require("../models/Player");
const Problem = require("../models/Problem");

router.get("/", async (req, res) => {
  const teams = await Team.find();
  return res.status(200).json(teams);
});

async function isTeamNameValid(name) {
  const teams = await Team.find();
  const names = teams.map((team) => team.name);
  if (names.includes(name)) return false;
  if (name.length < 3 || name.length > 20) return false;
  return true;
}
router.post("/", async (req, res) => {
  try {
    if (!(await isTeamNameValid(req.body.name)))
      return res.status(400).json("invalid");
    const problems = await Problem.find();
    const newTeam = new Team({
      name: req.body.name,
      score: 0,
      players: [],
      problems: problems,
    });
    const team = await newTeam.save();
    return res.status(200).json(team);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.put("/joinTeam", async (req, res) => {
  try {
    const team = await Team.findOne({ name: req.body.name });
    if (!team) return res.status(400).json("team does not exist");
    const player = await Player.findOne({ name: req.body.playerName });

    if ((await Team.findOne({ name: player.teamName })) !== null) {
      const oldTeam = await Team.findOneAndUpdate(
        { name: player.teamName },
        { $pull: { players: player } },
        { new: true }
      );
    }
    const newPlayer = await Player.findOneAndUpdate(
      { name: req.body.playerName },
      { $set: { teamName: req.body.name } },
      { new: true }
    );

    const newTeam = await Team.findOneAndUpdate(
      { name: req.body.name },
      { $push: { players: newPlayer } },
      { new: true }
    );
    return res.status(200).json("ok");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
router.put("/deleteTeam", async (req, res) => {
  try {
    const team = await Team.deleteOne({ name: req.body.name });
    const del = await Team.deleteMany({ name: req.body.name });
    return res.status(200).json("ok");
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.put("/updateSelectedChoices/:teamId", async (req, res) => {
  try {
    console.log(req.body.selectedChoices);
    const team = await Team.findById(req.params.teamId);
    await team.updateOne({ $set: { selectedChoices: req.body.selectedChoices } });
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
