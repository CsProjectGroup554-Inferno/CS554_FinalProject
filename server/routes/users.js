const express = require("express");
const router = express.Router();
const data = require("../data");
const redis = require("redis");
const client = redis.createClient();
const authorizeuser = require("./authorize");
const userData = data.users;

router.get("/:id", authorizeuser, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userData.getUserById(userId);
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;
