const users = require("./users");
const properties = require("./properties");
const messageRoutes = require("./messages");

const constructorMethod = (app) => {
  app.use("/api/users", users);
  app.use("/api/properties", properties);
  app.use("/api/messages", messageRoutes);
  app.use("/api/*", (req, res) => {
    res.status(404).json({ error: "Route Not found" });
  });
};
module.exports = constructorMethod;
