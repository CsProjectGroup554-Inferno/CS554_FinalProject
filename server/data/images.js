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
const ImageSize = require("image-size");
const fileType = require("file-type");
const md5 = require("md5");

let validateImage = async (filePath) => {
  if (!filePath) throw "You must provide a file path";
  let stream = fs.createReadStream(filePath);
  let type = await fileType.fromStream(stream);
  if (!type) throw "Invalid file type";
  if (type.mime !== "image/jpeg" && type.mime !== "image/png" && type.mime !== "image/jpg") {
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
};

let validateBase64 = async (base64) => {
  if (!base64) throw "You must provide a base64 string";
  let re = /^data:image\/(jpeg|png|jpg);base64,/;
  if (!re.test(base64)) throw "Invalid base64 string";
};

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

let createGridFS = async (filePath, fileName, fieldName) => {
  if (validateImage(filePath)) {
    let RawImageData = fs.readFileSync(filePath);
    let dimentions = ImageSize(RawImageData);
    let width = dimentions.width;
    let height = dimentions.height;
    // resize image to a max width of 1280px
    if (width > 1280) {
      RawImageData = await resizeImg(RawImageData, { width: 1280 });
    }
    // resize image to a max height of 720px
    if (height > 720) {
      RawImageData = await resizeImg(RawImageData, { height: 720 });
    }
    // compress image
    const buffer = await imagemin.buffer(RawImageData, {
      plugins: [imageminMozjpeg({ quality: 80 }), imageminPngquant({ quality: [0.6, 0.8] })],
    });
    // write compressed image to file
    fs.writeFileSync(filePath, buffer);

    const ImagesCollection = await images();
    const ChunksCollection = await chunks();

    let base64 = base64Img.base64Sync(filePath);
    let newImages = {
      filename: fileName,
      contentType: "image/jpeg",
      length: base64.length,
      chunkSize: 255 * 1024,
      uploadDate: new Date(),
      md5: md5(base64),
      metadata: {
        fieldName: fieldName,
        width: width,
        height: height,
      },
    };
    const insertInfo = await ImagesCollection.insertOne(newImages);
    if (insertInfo.aknowledged === false) {
      fs.unlinkSync(filePath);
      throw "Could not add image";
    }
    const newId = insertInfo.insertedId;
    let chunks = await splitBase64ToChunks(base64);
    for (let i = 0; i < chunks.length; i++) {
      let newChunks = {
        files_id: newId,
        n: i,
        data: chunks[i],
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
  if (typeof id !== "string" || id.trim() === "") throw "Invalid id";
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
  const chunks = await ChunksCollection.find({ files_id: ObjectId(id) }).toArray();
  let base64 = "";
  for (let i = 0; i < chunks.length; i++) {
    base64 += chunks[i].data;
  }
  return base64;
};

module.exports = {
  validateBase64,
  createGridFS,
  deleteImageandChunks,
  getImageById,
};
