const {
  projectMembersService,
  addMemberToProject,
  removeMemberFromProject,
  memberProjectAccessService,
} = require("../../services/projectMembersService");

const projectMembersListController = async (req, res) => {
  const { projectId } = req.params;
  const members = await projectMembersService(projectId);
  return res.json({ members });
};

const projectMembersAddController = async (req, res) => {
  const { projectId } = req.params;
  const { username } = req.body;
  const add = await addMemberToProject(username, projectId);
  if (add) {
    return res.json({ success: true });
  }
  return res.json({ success: false });
};

const projectMembersRemoveController = async (req, res) => {
  const { projectId, username } = req.params;
  const remove = await removeMemberFromProject(username, projectId);
  if (remove) {
    return res.json({ success: true });
  }
  return res.json({ success: false });
};

const projectMemberAccessController = async (req, res) => {
  const { projectId, username } = req.params;
  const { admin } = req.body;
  if (admin === undefined) {
    return res.json({ success: false, message: "admin is required" });
  }
  const result = await memberProjectAccessService(username, projectId, admin);
  if (result) {
    return res.json({ success: true });
  }
  return res.json({ success: false });
};

module.exports = {
  projectMembersListController,
  projectMembersAddController,
  projectMembersRemoveController,
  projectMemberAccessController,
};
