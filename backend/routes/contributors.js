const router = require("express").Router();
const axios = require("axios");
const Contributor = require("../models/Contributor");

router.get(
  "/contributors/sort/:sort/page/:page/limit/:limit",
  async (req, res) => {
    const sortQ = req.params.sort;
    const pageQ = parseInt(req.params.page);
    const limitQ = parseInt(req.params.limit);

    try {
      const response = await Contributor.find({})
        .skip(pageQ * limitQ)
        .limit(limitQ)
        .sort([[sortQ, -1]]);

      res.json(response);
    } catch (error) {
      res.json(error);
    }
  }
);

router.get("/contributors/count", async (req, res) => {
  try {
    const response = await Contributor.count({});
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

router.get("/contributors/getUserData/:username", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${req.params.username}`,
      {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.log(error);
  }
});

router.get("/contributors/getUserRepos/:username", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${req.params.username}/repos`,
      {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
