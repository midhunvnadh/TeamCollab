const express = require("express");
const {
  createTask,
  getTasks,
  editTask,
  getTaskController,
  deleteTaskController,
} = require("../controllers/tasks/tasks");
const {
  createComment,
  getComments,
  editComment,
  deleteComment,
} = require("../controllers/tasks/comments");
const { sessionMW } = require("../middlewares/sessionMW");

const router = express.Router();

router.use(sessionMW);
router.get("/:projectId/tasks", getTasks);
router.put("/:projectId/tasks", createTask);
router.get("/:projectId/tasks/:taskId", getTaskController);
router.patch("/:projectId/tasks/:taskId", editTask);
router.delete("/:projectId/tasks/:taskId", deleteTaskController);

router.put("/:projectId/tasks/:taskId/comments", createComment);
router.get("/:projectId/tasks/:taskId/comments", getComments);
router.patch("/:projectId/tasks/:taskId/comments/:commentId", editComment);
router.delete("/:projectId/tasks/:taskId/comments/:commentId", deleteComment);

module.exports = router;
