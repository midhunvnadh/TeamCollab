const { transaction } = require("../lib/db");
const { assignProject, createProject } = require("../repository/projects");

const createProjectService = async (projectName, userId) => {
  try {
    const projectId = await transaction(async () => {
      const id = await createProject(projectName);
      const assign = await assignProject(id, userId, true);
      if (id && assign) {
        return id;
      } else {
        return null;
      }
    });
    if (projectId) {
      return { success: true, projectId };
    } else {
      return { success: false };
    }
  } catch (error) {
    return { success: false };
  }
};

module.exports = {
  createProjectService,
};
