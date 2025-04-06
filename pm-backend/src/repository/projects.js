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
      RETURNING *
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

module.exports = {
  createProject,
  assignProject,
  getProjectsByUserId,
};
