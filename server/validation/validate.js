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
};
