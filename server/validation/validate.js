let checkString = async (str) => {
  if (!str || typeof str !== "string" || str.trim() === "") {
    throw "Error: Invalid string, please enter a string";
  }
  return true;
};

module.exports = {
  checkString,
};
