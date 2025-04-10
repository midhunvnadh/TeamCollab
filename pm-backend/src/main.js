const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
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
  getProjectController,
} = require("./controllers/projects/project");
const {
  createTask,
  getTasks,
  editTask,
  getTaskController,
  deleteTaskController,
} = require("./controllers/tasks/tasks");
const { accessibleProjectsMW } = require("./middlewares/accessibleProjectsMW");
const {
  projectMembers,
  projectMembersController,
} = require("./controllers/projects/members");

app.post("/auth/signup", signup);
app.post("/auth/signin", signin);

app.use(sessionMW);
app.get("/auth/session", session);
app.put("/projects", createProjectController);
app.get("/projects", getProjectsController);

app.use("/projects/:projectId/", accessibleProjectsMW);
app.get("/projects/:projectId", getProjectController);
app.delete("/projects/:projectId", deleteProjectController);
app.patch("/projects/:projectId", editProjectController);

app.get("/projects/:projectId/members", projectMembersController);
app.put("/projects/:projectId/members", getTasks);
app.delete("/projects/:projectId/members/:memberId", getTasks);

app.get("/projects/:projectId/tasks", getTasks);
app.put("/projects/:projectId/tasks", createTask);
app.get("/projects/:projectId/tasks/:taskId", getTaskController);
app.patch("/projects/:projectId/tasks/:taskId", editTask);
app.delete("/projects/:projectId/tasks/:taskId", deleteTaskController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
