const {
  projectMembers,
  createProjectMember,
  removeProjectMember,
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
  console.log(user, username, projectId);
  if (!user) {
    throw new Error("User not found");
  }
  const userId = user.id;
  return removeProjectMember(userId, projectId);
};

module.exports = {
  projectMembersService,
  addMemberToProject,
  removeMemberFromProject,
};
