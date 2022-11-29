/* eslint-disable no-throw-literal */
const validateEmail = async (email) => {
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

const validatePassword = async (password) => {
  if (!password) {
    throw "Password is required";
  }
  if (password.length < 6) {
    throw "Password must be at least 6 characters";
  }
};

const validatePasswordsMatch = async (password, confirmPassword) => {
  await validatePassword(password);
  await validatePassword(confirmPassword);
  if (password !== confirmPassword) {
    throw "Passwords do not match";
  }
};

const validate = {
  email: validateEmail,
  password: validatePassword,
  passwordsMatch: validatePasswordsMatch,
};

export default validate;
