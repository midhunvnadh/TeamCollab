const { transaction } = require("../lib/db");
const {
  assignProject,
  createProject,
  getProjectsByUserId,
} = require("../repository/projects");

const createProjectService = async (projectName, userId) => {
  try {
    const projectId = await transaction(async () => {
      const id = await createProject(projectName);
      const assign = await assignProject(id, userId, true);
      console.log("Project ID:", id, "Assigned:", assign);
      if (id && assign) {
        return id;
      } else {
        throw new Error("Failed to create and assign project");
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

const getProjectsService = async (userId) => {
  try {
    const projects = await getProjectsByUserId(userId);
    if (projects) {
      return { success: true, projects };
    } else {
      return { success: false };
    }
  } catch (error) {
    return { success: false };
  }
};

module.exports = {
  createProjectService,
  getProjectsService,
};
