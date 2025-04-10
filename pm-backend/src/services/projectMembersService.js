const {
  projectMembers,
  createProjectMember,
  removeProjectMember,
  projectMemberAccess,
} = require("../repository/projects");
const { getUserByUsername } = require("../repository/user");

const projectMembersService = (pid) => {
  return projectMembers(pid);
};

const addMemberToProject = async (username, projectId) => {
  const user = await getUserByUsername(username);
  if (!user) {
    throw new Error("User not found");
  }
  const userId = user.id;
  return createProjectMember(userId, projectId);
};

const removeMemberFromProject = async (username, projectId) => {
  const user = await getUserByUsername(username);
  if (!user) {
    throw new Error("User not found");
  }
  const userId = user.id;
  return removeProjectMember(userId, projectId);
};

const memberProjectAccessService = async (username, projectId, admin) => {
  const user = await getUserByUsername(username);
  if (!user) {
    throw new Error("User not found");
  }
  const userId = user.id;
  return projectMemberAccess(userId, projectId, admin);
};

module.exports = {
  projectMembersService,
  addMemberToProject,
  removeMemberFromProject,
  memberProjectAccessService,
};
