const router = require("express").Router();
const Team = require("../models/Team");

router.get("/", (req, res) => {
  return res.status(200).json(Team.find());
});

router.post("/", async (req, res) => {
  try {
    const newTeam = await new Team({
      name: req.body.name,
      score: 0,
      players: [],
    });
    const teams = await Team.find();
      console.log(teams);
    const team = await newTeam.save();
    return res.status(200).json(team);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        req.body.password = req.body.password;
      } catch (err) {
        return res.status(500).json(err);
      }
    }

    try {
      const player = await Player.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("account has been updated");
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("you can update only your account");
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("account has been deleted");
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("you can delete only your account");
  }
});

//get a user
// router.get("/:id", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     const { passward, updateAt, ...other } = user._doc;
//     res.status(200).json(other);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//クエリでuser情報を取得
// router.get("/", async (req, res) => {
//   try {
//     const playerName = req.body.name;
//     const players = await Player.find();
//     return res.status(200).json(players);
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// });

//follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      //フォロワーにいなかったらフォローできる
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followd");
      } else {
        return res.status(403).json("you allready follow this user");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(500).json("cant follow yourself");
  }
});

//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      //フォロワーにいたらフォロー外せる
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowd");
      } else {
        return res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(500).json("cant unfollow yourself");
  }
});

module.exports = router;
