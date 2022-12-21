const express = require("express");
const router = express.Router();
const data = require("../data");
const redis = require("redis");
const client = redis.createClient({
  url: process.env.REDIS_URL,
});
const authorizeuser = require("./authorize");
const propertiesData = data.properties;
const imageData = data.images;
const userData = data.users;
const validate = require("../validation/validate");
const base64Img = require("base64-img");
const xss = require("xss");

router.delete("/:id", authorizeuser, async (req, res) => {
  try {
    req.params.id = xss(req.params.id);
    const propertyId = req.params.id;
    await client.connect();
    // reset property redis
    await client.del("property" + req.params.id);
    await client.quit();
    // get owner id
    const property = await propertiesData.getPropertyById(propertyId);
    if (!property) {
      res.status(404).json({ error: "Property not found" });
    }
    if (property.owner !== req.user.uid) {
      res.status(401).json({ error: "Unauthorized" });
    }
    const deletedProperty = await propertiesData.deletePropertyFromDB(req.params.id, property.owner);

    // remove images
    try {
      let imagesIds = property.images;
      for (let imageId of imagesIds) {
        await imageData.deleteImageandChunks(imageId);
      }
    } catch (e) {
      res.status(500).json({ error: e });
      return;
    }

    res.json(deletedProperty);
  } catch (e) {
    await client.quit();
    res.status(500).json({ error: e });
  }
});

router.get("/", async (req, res) => {
  req.query.page = xss(req.query.page);
  req.query.sort = xss(req.query.sort);
  req.query.filter = xss(req.query.filter);

  // let allSave = ""
  let page = 1;
  let sort;
  let filter;
  try {
    if (req.query.page) {
      validate.checkPage(req.query.page);
    }

    if (req.query.sort && req.query.sort !== "null") {
      sort = req.query.sort;
    } else {
      sort = null;
    }
    if (req.query.filter && req.query.filter !== "null") {
      filter = req.query.filter;
    } else {
      filter = null;
    }
  } catch (e) {
    res.status(400).json({ error: "Invalid parameter" });
    return;
  }

  let propData;
  try {
    propData = await propertiesData.getAllProperty(req.query.page, filter, sort);

    for (let i = 0; i < propData.properties.length; i++) {
      propData.properties[i].imageData = [];
      propData.properties[i].imageData.push(await imageData.getImageById(propData.properties[i].images[0].toString()));
    }
    res.json(propData);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.get("/:id", async (req, res) => {
  try {
    req.params.id = xss(req.params.id);
    let id = req.params.id.toString();
    validate.checkId(id);
    if (typeof id != "string") {
      id = id.toString();
    }
  } catch (e) {
    res.status(400).json({ error: e });
    return;
  }

  try {
    await client.connect();
    var jsonProperty = await client.get("property" + req.params.id);
    await client.quit();
    property = JSON.parse(jsonProperty);
    property = await propertiesData.getPropertyById(req.params.id);
  } catch (e) {
    await client.quit();
    res.status(404).json({ error: "Property not found" });
    return;
  }

  // get images data
  try {
    let imagesIds = property.images;
    property.images = [];
    for (let imageId of imagesIds) {
      property.images.push(await imageData.getImageById(imageId.toString()));
    }
  } catch (e) {
    res.status(500).json({ error: e });
    return;
  }

  // get owner data
  try {
    let ownerId = property.owner;
    property.owner = await userData.getUserById(ownerId);
  } catch (e) {
    res.status(500).json({ error: e });
  }

  jsonProperty = JSON.stringify(property);
  try {
    await client.connect();
    await client.set("property" + req.params.id, jsonProperty);
    await client.quit();
  } catch (e) {
    await client.quit();
  }

  res.json(property);
});

router.post("/", authorizeuser, async (req, res) => {
  let propertyInfo = req.body.owner;
  let owner = req.user.uid;

  let imagesInfo = propertyInfo.images;
  propertyInfo.images = [];
  try {
    for (let i = 0; i < imagesInfo.length; i++) {
      imageData.validateBase64(imagesInfo[i][2]);
      let filepath = await base64Img.imgSync(imagesInfo[i][2], "./public/img", imagesInfo[i][0].split(".")[0]);

      let mime = "image/" + filepath.split(".").pop();

      let id = await imageData.createGridFS(filepath, imagesInfo[i][0], imagesInfo[i][1], mime);

      propertyInfo.images.push(id);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "fail handling uploaded images" });
    return;
  }

  try {
    const property = await propertiesData.addPropertyToDB(propertyInfo, owner);
    res.json(property);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.put("/:id", authorizeuser, async (req, res) => {
  try {
    req.params.id = xss(req.params.id);
  } catch (e) {
    res.status(400).json({ error: "Invalid parameter" });
    return;
  }
  let propertyBody = req.body;

  let property;
  try {
    // get property
    property = await propertiesData.getPropertyById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "property not found" });
    return;
  }

  try {
    let pid = req.params.id;
    const property = await propertiesData.updatePropertyInDB(pid, propertyBody);

    // reset property redis
    await client.connect();
    await client.del("property" + pid);
    await client.quit();

    res.json(property);
  } catch (e) {
    await client.quit();
    res.status(500).json({ error: e });
  }
});

module.exports = router;
