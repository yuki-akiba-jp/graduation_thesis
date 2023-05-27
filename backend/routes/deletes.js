const router = require("express").Router();
const Team = require("../../frontend/src/pages/api/models/Team");
const Player = require("../../frontend/src/pages/api/models/Player");
const Problem = require("../../frontend/src/pages/api/models/Problem");

router.delete("/", async (req, res) => {
  try {
    Team.deleteMany({}, function (err) {
      if (err) {
        console.log(err);
      }
    });
    Player.deleteMany({}, function (err) {
      if (err) {
        console.log(err);
      }
    });
    Problem.deleteMany({}, function (err) {
      if (err) {
        console.log(err);
      }
    });

    res.status(200).json("account has been deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
