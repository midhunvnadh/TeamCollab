const { query } = require("../lib/db");
const createProject = async (projectName) => {
  try {
    const result = await query(
      "INSERT INTO projects (name) VALUES ($1) RETURNING id",
      [projectName]
    );
    return result[0].id;
  } catch (error) {
    console.error("Error creating project:", error);
    return false;
  }
};
const assignProject = async (projectId, userId, admin = false) => {
  try {
    const result = await query(
      `
      INSERT INTO
      user_projects_access
      (project_id, user_id, admin)
      VALUES
      ($1, $2, $3)
      `,
      [projectId, userId, +admin]
    );
    return result.rowCount > 0;
  } catch (error) {
    console.error("Error assigning project:", error);
    return false;
  }
};

module.exports = {
  createProject,
  assignProject,
};
