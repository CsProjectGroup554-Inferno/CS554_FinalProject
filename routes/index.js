const users = require("./users");
const properties = require("./properties");

const constructorMethod = (app) => {
  app.use("/users", users);
  app.use("/properties", properties);
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Route Not found" });
  });
};
module.exports = constructorMethod;
