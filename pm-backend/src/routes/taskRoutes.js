const express = require("express");
const {
  createTask,
  getTasks,
  editTask,
  getTaskController,
  deleteTaskController,
} = require("../controllers/tasks/tasks");
const { sessionMW } = require("../middlewares/sessionMW");

const router = express.Router();

router.use(sessionMW);
router.get("/:projectId/tasks", getTasks);
router.put("/:projectId/tasks", createTask);
router.get("/:projectId/tasks/:taskId", getTaskController);
router.patch("/:projectId/tasks/:taskId", editTask);
router.delete("/:projectId/tasks/:taskId", deleteTaskController);

module.exports = router;
