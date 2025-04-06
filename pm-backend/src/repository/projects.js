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
      RETURNING id
      `,
      [projectId, userId, admin]
    );
    console.log("Assign project result:", result);
    return result.length > 0;
  } catch (error) {
    console.error("Error assigning project:", error);
    return false;
  }
};

const getProjectsByUserId = async (userId) => {
  try {
    const result = await query(
      `
      SELECT p.id, p.name
      FROM projects p
      JOIN user_projects_access upa ON p.id = upa.project_id
      WHERE upa.user_id = $1
      `,
      [userId]
    );
    return result;
  } catch (error) {
    console.error("Error getting projects by user ID:", error);
    return false;
  }
};

const deleteProject = async (projectId) => {
  try {
    const result = await query(
      "DELETE FROM projects WHERE id = $1 RETURNING id",
      [projectId]
    );
    return result.length > 0;
  } catch (error) {
    console.error("Error deleting project:", error);
    return false;
  }
};

const editProject = async (projectId, name) => {
  try {
    const result = await query(
      "UPDATE projects SET name = $1 WHERE id = $2 RETURNING id",
      [name, projectId]
    );
    return result.length > 0;
  } catch (error) {
    console.error("Error editing project:", error);
    return false;
  }
};

module.exports = {
  createProject,
  assignProject,
  getProjectsByUserId,
  deleteProject,
  editProject,
};
