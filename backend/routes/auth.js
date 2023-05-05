const router = require("express").Router();
const Player = require("../models/Player");
// const bcrypt = require("bcrypt");

//register
router.post("/register", async (req, res) => {
  try {
    //generate crypt password
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create player
    const newPlayer = await new Player({
      name: req.body.name,
      score: 0,
    });

    //save player
    const player = await newPlayer.save();
    return res.status(200).json(player);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const player = await Player.findOne({ name: req.body.name });
    if (!player) return res.status(404).send("player not found");

    // const vailedPassword = await bcrypt.compare(
    //   req.body.password,
    //   player.password,
    //   (err, res) => {
    //     console.log(res);
    //   }
    // );

    const vailedPassword = req.body.password === player.password;

    if (!vailedPassword) return res.status(400).json("password is not correct");

    return res.status(200).json(player);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;

