const express = require("express");
const {
  createProjectController,
  getProjectsController,
  deleteProjectController,
  editProjectController,
  getProjectController,
} = require("../controllers/projects/project");
const { accessibleProjectsMW } = require("../middlewares/accessibleProjectsMW");
const {
  projectMembersListController,
  projectMembersAddController,
  projectMembersRemoveController,
  projectMemberAccessController,
} = require("../controllers/projects/members");
const { sessionMW } = require("../middlewares/sessionMW");

const router = express.Router();

router.use(sessionMW);
router.put("/", createProjectController);
router.get("/", getProjectsController);
router.use("/:projectId", accessibleProjectsMW);
router.get("/:projectId", getProjectController);
router.delete("/:projectId", deleteProjectController);
router.patch("/:projectId", editProjectController);
router.get("/:projectId/members", projectMembersListController);
router.put("/:projectId/members", projectMembersAddController);
router.patch("/:projectId/members/:username", projectMemberAccessController);
router.delete("/:projectId/members/:username", projectMembersRemoveController);

module.exports = router;
