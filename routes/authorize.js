const admin = require("firebase-admin");
const firebaseAccount = require("../config/firebaseAccount.json");
const data = require("../data");
const userData = data.users;

admin.initializeApp({
  credential: admin.credential.cert(firebaseAccount),
});

const authorizeuser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    const user = await userData.getUserById(req.user.uid);
    if (user === null) {
      const newUser = await userData.addUserToDB(req.user);
      req.user = newUser; 
    }
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = authorizeuser;
