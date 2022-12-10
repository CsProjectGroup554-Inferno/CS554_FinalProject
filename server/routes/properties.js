const express = require("express");
const router = express.Router();
const data = require("../data");
const redis = require("redis");
const client = redis.createClient();
const authorizeuser = require("./authorize");
const propertiesData = data.properties;
const imageData = data.images;
const userData = data.users;
const validate = require("../validation/validate");
// clear redis
client.connect()
client.FLUSHDB();

router.delete("/:id", authorizeuser, async (req, res) => {
  try {
    const propertyId = req.params.id;
    // get owner id
    const property = await propertiesData.getPropertyById(propertyId);
    if (!property) {
      res.status(404).json({ error: "Property not found" });
    }
    if (property.owner !== req.user.uid) {
      res.status(401).json({ error: "Unauthorized" });
    }

    // remove images
    try {
      let imagesIds = property.images
      for (let imageId of imagesIds) {
        await imageData.deleteImageandChunks(imageId)
      }
    } catch (e) {
      res.status(500).json({ error: "fail removing images" });
      return
    }

    const deletedProperty = await propertiesData.deletePropertyFromDB(req.params.id, ownerId);

    // reset property redis
    await client.delAsync("property" + req.params.id);

    res.json(deletedProperty);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.get('/', async (req, res) => {
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
    propData = await propertiesData.getAllProperty(req.query.page,filter, sort);
    console.log(propData)
    
    for (let i = 0; i < propData.properties.length; i++) {
      propData.properties[i].imageData = [];
      for (let j = 0; j < propData.properties[i].images.length; j++) {
        propData.properties[i].imageData.push(await imageData.getImageById(propData.properties[i].images[j].toString()))
      }
    }
    res.json(propData);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.get('/:id', async (req, res) => {
  try {
    let id = req.params.id.toString();
    validate.checkId(id)
    if (typeof id != "string") {
      id = id.toString();
    }
  } catch (e) {
    res.status(400).json({ error: e });
    return;
  }

  var jsonProperty = await client.get("property" + req.params.id);
  property = JSON.parse(jsonProperty);

  try {
    property = await propertiesData.getPropertyById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'Property not found' });
    return;
  }

  // get images data
  try {
    let imagesIds = property.images
    console.log(imagesIds)
    property.images = []
    for (let imageId of imagesIds) {
      console.log(imageId)
      property.images.push(await imageData.getImageById(imageId.toString()));
    }
  } catch (e) {
    res.status(500).json({ error: e });
    return;
  }

  // get owner data
  try {
    let ownerId = property.owner
    property.owner = await userData.getUserById(ownerId);
    // res.json(property);
  } catch (e) {
    res.status(500).json({ error: e });
  }

  jsonProperty = JSON.stringify(property)
  await client.set("property" + req.params.id, jsonProperty);

  res.json(property);
});

router.post('/', authorizeuser, async (req, res) => {
  let propertyInfo = req.body;
  let owner = res.locals.userUid;

  let imagesInfo = propertyInfo.images;
  propertyInfo.images = []

  try {
    for (let i = 0; i < imagesInfo.length; i++) {
      imageData.validateBase64(imagesInfo[i][2])
      let filepath = await base64Img.imgSync(imagesInfo[i][2], './public/img', imagesInfo[i][0].split(".")[0]);
      let id = await imageData.createGridFS(filepath, imagesInfo[i][0], imagesInfo[i][1]);
      propertyInfo.images.push(id);
    }
  } catch (e) {
    res.status(500).json({ error: "fail handling uploaded images" });
    return
  }

  try {
    const property = await propertiesData.addPropertyToDB(propertyInfo, owner);
    res.json(property);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.put("/:id", authorizeuser, async (req, res) => {
  let propertyBody = req.body;

  // get property  
  let property
  try {
    property = await propertiesData.getPropertyById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'property not found' });
    return;
  }

  propertyBody.images = property.images

  // handle removed images
  try {
    let removedImages = propertyBody.removedImages
    let imagesIds = propertyBody.images
    for (let imageId of imagesIds) {
      let imgData = await imageData.getImageById(imageId)
      if (removedImages.includes(imgData)) {
        var index = propertyBody.images.indexOf(imageId);
        if (index > -1) {
          propertyBody.images.splice(index, 1);
          await imageData.deleteImageandChunks(imageId)
        }
      }
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: "fail handling removed images" });
    return
  }

  // handle new added images
  try {
    let newImages = propertyBody.newImages
    for (let i = 0; i < newImages.length; i++) {
      imageData.validateBase64(newImages[i][2])
      let filepath = await base64Img.imgSync(newImages[i][2], './public/img', newImages[i][0].split(".")[0]);
      let id = await imageData.createGridFS(newImages[i][0], newImages[i][1], filepath);
      propertyBody.images.push(id);
    }
  } catch (e) {
    res.status(500).json({ error: "fail handling uploaded images" });
    return
  }

  try {
    let pid = req.params.id;
    // console.log("pid", propertyBody);
    const property = await propertiesData.updatePropertyInDB(pid, propertyBody);

    // reset property redis
    await client.delAsync("property" + pid);

    res.json(property);
  } catch (e) {
    res.status(500).json({ error: e });
  }
})

module.exports = router;
