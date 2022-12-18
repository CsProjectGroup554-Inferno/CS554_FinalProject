const users = require("./users");
const properties = require("./properties");
const messageRoutes = require("./messages");

const constructorMethod = (app) => {
  app.use("/users", users);
  app.use("/properties", properties);
  app.use("/messages", messageRoutes);
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Route Not found" });
  });
};
module.exports = constructorMethod;
