const express = require("express");
const router = express.Router();
const data = require("../data");
const redis = require("redis");
const client = redis.createClient();
const authorizeuser = require("./authorize");
const userData = data.users;
const propertiesData = data.properties;
const validate = require("../validation/validate");

router.get("/favorites", authorizeuser, async (req, res) => {
  try {
    const userId = req.user.uid;
    const user = await userData.getUserById(userId);
    let favoritesList = await userData.getFavoritesList(userId);
    let favorites = [];
    for (const element of favoritesList) {
      let favorite = await propertiesData.getPropertyById(element);
      favorites.push(favorite);
    }
    res.json(favorites).status(200);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.get("/", authorizeuser, async (req, res) => {
  try {
    const user = await userData.getUserById(req.user.uid);
    let propertyList = user.properties;
    let favoritesList = user.favorites;
    let email = user.email;
    let properties = [];
    let favorites = [];
    for (let i = 0; i < propertyList.length; i++) {
      let property = await propertiesData.getPropertyById(propertyList[i]);
      properties.push(property);
    }
    for (let i = 0; i < favoritesList.length; i++) {
      let favorite = await propertiesData.getPropertyById(favoritesList[i]);
      favorites.push(favorite);
    }
    res.json({ properties, favorites, email });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/favorites", authorizeuser, async (req, res) => {
  try {
    const userId = req.user.uid;
    const propertyId = req.body.propertyId;
    const user = await userData.getUserById(userId);
    const property = await propertiesData.getPropertyById(propertyId);
    if (!property) {
      res.status(404).json({ error: "Property not found" });
      return;
    }
    if (user.favorites.includes(propertyId)) {
      res.status(400).json({ error: "Property already in favorites" });
      return;
    }
    await userData.addFavorite(userId, propertyId);
    res.json({ message: "Property added to favorites" });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.get("/:id", authorizeuser, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userData.getUserById(userId);
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.delete("/favorites", authorizeuser, async (req, res) => {
  try {
    const userId = req.user.uid;
    const propertyId = req.body.propertyId;
    const user = await userData.getUserById(userId);
    const property = await propertiesData.getPropertyById(propertyId);
    if (!property) {
      res.status(404).json({ error: "Property not found" });
      return;
    }
    if (!user.favorites.includes(propertyId)) {
      res.status(400).json({ error: "Property not in favorites" });
      return;
    }
    await userData.removeFavorite(userId, propertyId);
    res.json({ message: "Property removed from favorites" });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;
