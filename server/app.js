const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json())

app.use(cors());
const configRoutes = require("./routes/index");
configRoutes(app);
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
