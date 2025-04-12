const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

const { applyGlobalMiddlewares } = require("./middlewares/globalMiddlewares");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

applyGlobalMiddlewares(app);

app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);
app.use("/projects", taskRoutes);
app.use("/", notificationRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
