const router = require("express").Router();
const Team = require("../../frontend/src/pages/api/models/Team");
const Problem = require("../../frontend/src/pages/api/models/Problem");

router.get("/problem/:id", async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    return res.status(200).json(problem);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/addProblemsArray", async (req, res) => {
  try {
    const problemsArray = require("../problemsArray");
    problemsArray.map(async (problem) => {
      const newProblem = await new Problem({
        name: problem.name,
        description: problem.description,
        answer: problem.answer,
        choices: problem.choices,
        selectedChoice: problem.selectedChoice,
        reward: problem.reward,
      });
      await newProblem.save();
    });

    return res.status(200).json("ok");
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newProblem = await new Problem({
      name: req.body.name,
      description: req.body.description,
      answer: req.body.answer,
      choices: req.body.choices,
      selectedChoice: "",
      reward: req.body.reward,
      score: 0,
    });
    const problem = await newProblem.save();
    return res.status(200).json(problem);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
