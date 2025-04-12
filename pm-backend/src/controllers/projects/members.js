const {
  projectMembersService,
  addMemberToProject,
  removeMemberFromProject,
  memberProjectAccessService,
} = require("../../services/projectMembersService");

const projectMembersListController = async (req, res) => {
  const { projectId } = req.params;

  if (!projectId) {
    return res
      .status(400)
      .json({ success: false, message: "Project ID is required" });
  }

  try {
    const members = await projectMembersService(projectId);
    return res
      .status(200)
      .json({
        success: true,
        message: "Members fetched successfully",
        members,
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const projectMembersAddController = async (req, res) => {
  const { projectId } = req.params;
  const { username } = req.body;

  if (!projectId || !username) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Project ID and username are required",
      });
  }

  try {
    const add = await addMemberToProject(username, projectId);
    if (add) {
      return res
        .status(200)
        .json({ success: true, message: "Member added successfully" });
    }
    return res
      .status(400)
      .json({ success: false, message: "Failed to add member" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const projectMembersRemoveController = async (req, res) => {
  const { projectId, username } = req.params;

  if (!projectId || !username) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Project ID and username are required",
      });
  }

  try {
    const remove = await removeMemberFromProject(username, projectId);
    if (remove) {
      return res
        .status(200)
        .json({ success: true, message: "Member removed successfully" });
    }
    return res
      .status(404)
      .json({ success: false, message: "Member not found" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const projectMemberAccessController = async (req, res) => {
  const { projectId, username } = req.params;
  const { admin } = req.body;

  if (!projectId || !username || admin === undefined) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Project ID, username, and admin status are required",
      });
  }

  try {
    const result = await memberProjectAccessService(username, projectId, admin);
    if (result) {
      return res
        .status(200)
        .json({ success: true, message: "Member access updated successfully" });
    }
    return res
      .status(404)
      .json({ success: false, message: "Member not found" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  projectMembersListController,
  projectMembersAddController,
  projectMembersRemoveController,
  projectMemberAccessController,
};
