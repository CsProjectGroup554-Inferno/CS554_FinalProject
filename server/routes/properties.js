const express = require("express");
const router = express.Router();
const data = require("../data");
const redis = require("redis");
const client = redis.createClient();
const authorizeuser = require("./authorize");
const propertiesData = data.properties;

router.delete("/:id", authorizeuser, async (req, res) => {
  try {
    const propertyId = req.params.id;
    // get owner id
    const property = await propertiesData.getPropertyById(propertyId);
    if (property.owner !== req.user.uid) {
      res.status(401).json({ error: "Unauthorized" });
    }
    const deletedProperty = await propertiesData.deleteProperty(propertyId);
    res.json(deletedProperty);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.get("/city", async (req, res) => {
  try {
    const city = req.query.city;
    const properties = await propertiesData.getPropertiesByCity(city);
    res.json(properties);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.get("/:id", authorizeuser, async (req, res) => {
  try {
    const propertyId = req.params.id;
    const property = await propertiesData.getPropertyById(propertyId);
    res.json(property);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;
