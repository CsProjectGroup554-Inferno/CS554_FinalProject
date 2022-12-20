const { ObjectID } = require("bson");

let checkString = async (str) => {
  if (!str || typeof str !== "string" || str.trim() === "") {
    throw "Error: Invalid string, please enter a string";
  }
  return true;
};

const checkEmail = async (email) => {
  if (!email) {
    throw "Email is required";
  }
  if (!email.includes("@")) {
    throw "Email is invalid";
  }
  const re = /\S+@\S+\.\S+/;
  if (!re.test(email)) {
    throw "Email is invalid";
  }
};


const checkPage = async (page) => {
  if (page === undefined) {
    throw "Page is undefined";
  }
  page = parseInt(page);

  if (isNaN(page)) {
    throw "Page is not a valid number";
  }

  if (page < 1) {
    throw "Page is not a positive number"
  }
};

const checkBedroom = async (bedrooms) => {
  if (!bedrooms) {
    throw "Bedroom info does not exist"
  }

  if (bedrooms != Number) {
    throw "Number of bedroom data is not valid"
  }

  if (bedrooms < 0) {
    throw "Number of bedroom data is not valid"
  }

  if (bedrooms > 4) {
    throw "Only 4 bedrooms allowed"
  }
};

const checkBathroom = async (bathroom) => {
  if (!bathroom) {
    throw "Bathroom info does not exist"
  }

  if (bathroom != Number) {
    throw "Number of bedroom data is not valid"
  }

  if (bathroom < 0) {
    throw "Number of bedroom data is not valid"
  }
};

const checkSize = async (size) => {
  if (!size) {
    throw "Size info does not exist"
  }

  if (size != Number) {
    throw "Size is not valid"
  }

  if (size < 0) {
    throw "Size is not valid"
  }
};

const checkPrice = async (price) => {
  if (!price) {
    throw "Price does not exist"
  }

  if (price != Number) {
    throw "Price is not valid"
  }

  if (price < 0) {
    throw "Price is not valid"
  }
};

const checkId = async (id) => {
  if (id === undefined) {
    throw "Id is undefined"
  }

  if (!ObjectID.isValid(id)) {
    throw "Id is invalid"
  }
};

const checkImages = async (images) => {
  if (images.length === 0) {
    throw "Images have to be uploaded"
  }
};

const checkPropertyInfo = async (info) => {
  if (!info) {
    throw "Property info missing";
  }

  this.checkString(info.title);
  this.checkString(info.description);
  this.checkString(info.city);
  this.checkPrice(parseInt(info.price));
  this.checkBedroom(parseInt(info.bedrooms));
  this.checkBathroom(parseInt(info.bathrooms));
  this.checkSize(parseInt(info.size));
  this.checkString(info.address);
  this.checkString(info.zipcode);
  this.checkImages(info.images);
}
// const checkPassword = async (password) => {
//   if (!password) {
//     throw "Password is required";
//   }
//   if (password.length < 6) {
//     throw "Password must be at least 6 characters";
//   }
// };

// const checkPasswordsMatch = async (password, confirmPassword) => {
//   await checkPassword(password);
//   await checkPassword(confirmPassword);
//   if (password !== confirmPassword) {
//     throw "Passwords do not match";
//   }
// };

module.exports = {
  checkString,
  checkEmail,
  checkPage,
  checkPrice,
  checkBathroom,
  checkBedroom,
  checkSize,
  checkId,
  checkPropertyInfo,
  checkImages
};
