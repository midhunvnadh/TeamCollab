const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = 3000;
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

const { session: sessionMW } = require("./middlewares/sessionMW");
const { signup } = require("./controllers/auth/signup");
const { signin } = require("./controllers/auth/signin");
const { session } = require("./controllers/auth/session");
const {
  createProjectController,
  getProjectsController,
  deleteProjectController,
  editProject,
  editProjectController,
} = require("./controllers/projects/project");

app.post("/auth/signup", signup);
app.post("/auth/signin", signin);

app.use(sessionMW);
app.get("/auth/session", session);
app.put("/projects", createProjectController);
app.get("/projects", getProjectsController);
app.delete("/projects/:projectId", deleteProjectController);
app.patch("/projects/:projectId", editProjectController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
