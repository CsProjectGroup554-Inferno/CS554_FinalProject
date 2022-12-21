const base64Img = require("base64-img");
const fs = require("fs");
const { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const images = mongoCollections.images;
const chunks = mongoCollections.chunks;
const imagemin = require("imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminPngquant = require("imagemin-pngquant");
const resizeImg = require("resize-img");
const sizeOf = require("image-size");
const fileType = require("file-type");
const md5 = require("md5");
const im = require('imagemagick');

async function validateImage(filePath) {

  if (!filePath) throw "You must provide a file path";
  let stream = fs.createReadStream(filePath);
  let mimetype = await fileType.fromStream(stream);

  const type = mimetype.mime.split("/");

  if (!type) throw "Invalid file type";

  if (mimetype.mime !== "image/jpeg" && mimetype.mime !== "image/png" && mimetype.mime !== "image/jpg" && mimetype.mime !== "image/avif") {
    fs.unlinkSync(filePath);
    throw "Invalid file type - must be jpeg or png";
  }
  let base64 = base64Img.base64Sync(filePath);
  if (!base64) throw "Invalid file type";
  // maxSize is 10MB
  let maxSize = 10 * 1024 * 1024;
  if (base64.length > maxSize) {
    fs.unlinkSync(filePath);
    throw "File size too large";
  }
  return true;
}

function validateBase64(base64) {
  if (!base64) throw "You must provide a base64 string";
  let re = /^data:image\/(jpeg|png|jpg);base64,/;
  if (!re.test(base64)) throw "Invalid base64 string";
}

let splitBase64ToChunks = async (base64) => {
  let chunkSize = 255 * 1024;
  let chunks = [];
  let numChunks = Math.ceil(base64.length / chunkSize);
  for (let i = 0; i < numChunks; i++) {
    let chunk = base64.substring(i * chunkSize, (i + 1) * chunkSize);
    chunks.push(chunk);
  }
  return chunks;
};

let createGridFS = async (filePath, fileName, fieldName, mime) => {
  if (validateImage(filePath)) {
    let filePath1 = "./"+filePath
    console.log(filePath)
    let RawImageData = fs.readFileSync(filePath);
   
    im.identify(filePath1, function(err, features){
        if (err) throw err;
      });
    // compress image
    const buffer = await imagemin.buffer(RawImageData, {
      plugins: [imageminMozjpeg({ quality: 80 }), imageminPngquant({ quality: [0.6, 0.8] })],
    });
    // write compressed image to file
    fs.writeFileSync(filePath, buffer);

    const ImagesCollection = await images();
    const ChunksCollection = await chunks();

    let base64 = base64Img.base64Sync(filePath);

    const type = fileName.split("/");

    let newImages = {
      filename: fileName,
      contentType: mime,
      chunkSize: 261120,
      uploadDate: new Date(),
      md5: md5(base64),

    };
    const insertInfo = await ImagesCollection.insertOne(newImages);
    if (insertInfo.aknowledged === false) {
      fs.unlinkSync(filePath);
      throw "Could not add image";
    }
    const newId = insertInfo.insertedId;
    let chunksSplit = await splitBase64ToChunks(base64);
    for (let i = 0; i < chunksSplit.length; i++) {
      let newChunks = {
        files_id: newId,
        n: i,
        data: chunksSplit[i],
      };
      const insertInfo = await ChunksCollection.insertOne(newChunks);
      if (insertInfo.aknowledged === false) {
        fs.unlinkSync(filePath);
        throw "Could not add image";
      }
    }
    fs.unlinkSync(filePath);
    return newId;
  }
};

let deleteImageandChunks = async (id) => {
  if (!id) throw "You must provide an id to search for and delete";
  if (!ObjectId.isValid(id)) throw "Invalid id";
  const ImagesCollection = await images();
  const ChunksCollection = await chunks();
  const deleteInfo = await ImagesCollection.deleteOne({ _id: ObjectId(id) });
  if (deleteInfo.deletedCount === 0) {
    throw `Could not delete image with id of ${id}`;
  }
  const deleteInfo2 = await ChunksCollection.deleteMany({ files_id: ObjectId(id) });
  if (deleteInfo2.deletedCount === 0) {
    throw `Could not delete chunks with id of ${id}`;
  }
  return true;
};

let getImageById = async (id) => {
  if (!id) throw "You must provide an id to search for";
  if (typeof id !== "string" || id.trim() === "") throw "Invalid id";
  if (!ObjectId.isValid(id)) throw "Invalid id";
  const ImagesCollection = await images();
  const ChunksCollection = await chunks();
  const image = await ImagesCollection.findOne({ _id: ObjectId(id) });
  if (image === null) throw "No image with that id";
  const chunksData = await ChunksCollection.find({ files_id: ObjectId(id) }).toArray();
  let base64 = "";
  for (let i = 0; i < chunksData.length; i++) {
    base64 += chunksData[i].data;
  }
  return base64;
};

module.exports = {
  validateBase64,
  createGridFS,
  deleteImageandChunks,
  getImageById,
};
