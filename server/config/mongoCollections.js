const dbConnection = require("./mongoConnection");

/* This will allow you to have one reference to each collection per app */
/* Feel free to copy and paste this this */
const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection.connectToDb();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

module.exports = {
  user: getCollectionFn("user"),
  property: getCollectionFn("property"),
  fsFiles: getCollectionFn("fs.files"),
  fsChunks: getCollectionFn("fs.chunks"),
};
