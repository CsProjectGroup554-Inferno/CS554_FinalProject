const express = require("express");
const router = express.Router();
const data = require("../data");
const redis = require("redis");
const client = redis.createClient({
  url: process.env.REDIS_URL,
});
const authorizeuser = require("./authorize");
const userData = data.users;
const imageData = data.images;
const propertiesData = data.properties;
const validate = require("../validation/validate");
const xss = require("xss");

router.get("/allusers/:id", authorizeuser, async (req, res) => {
  try {
    req.params.id = xss(req.params.id);
    const user = await userData.getalluser(req.params.id);

    return res.json(user);
  } catch (e) {
    res.status(500).json({ error: e });
    return;
  }
});

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
    return;
  } catch (e) {
    res.status(500).json({ error: e });
    return;
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

    for (let i = 0; i < properties.length; i++) {
      properties[i].imageData = [];
      properties[i].imageData.push(await imageData.getImageById(properties[i].images[0].toString()));
    }
    console.log(properties);

    for (let i = 0; i < favoritesList.length; i++) {
      let favorite = await propertiesData.getPropertyById(favoritesList[i]);
      favorites.push(favorite);
    }
    res.json({ properties, favorites, email });
    return;
  } catch (e) {
    res.status(500).json({ error: e });
    return;
  }
});

router.post("/favorites/delete", authorizeuser, async (req, res) => {
  try {
    const userId = req.user.uid;
    req.body.propertyId = xss(req.body.propertyId);
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
    return;
  } catch (e) {
    res.status(500).json({ error: e });
    return;
  }
});

router.post("/favorites", authorizeuser, async (req, res) => {
  try {
    const userId = req.user.uid;
    req.body.propertyId = xss(req.body.propertyId);
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
    return;
  } catch (e) {
    res.status(500).json({ error: e });
    return;
  }
});

router.get("/:id", authorizeuser, async (req, res) => {
  try {
    req.params.id = xss(req.params.id);
    const userId = req.params.id;
    const user = await userData.getUserById(userId);
    res.json(user);
    return;
  } catch (e) {
    res.status(500).json({ error: e });
    return;
  }
});

module.exports = router;
