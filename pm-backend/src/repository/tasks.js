const { query } = require("../lib/db");

const createTask = async (projectId, taskName, assignTo = nul, status = 0) => {
  const q = await query(
    `INSERT INTO tasks (title, project_id, assigned_to_user, status) VALUES ($1, $2, $3, $4) RETURNING id`,
    [taskName, projectId, assignTo, status]
  );
  const taskId = q[0].id;
  if (taskId) {
    return { success: true, taskId };
  } else {
    return { success: false };
  }
};
const getTasks = async (projectId) => {
  const q = await query(
    `SELECT tasks.id as id, title, assigned_to_user, status, tasks.created_at, users.username as assigned_to_user_name
     FROM tasks
     LEFT JOIN users ON tasks.assigned_to_user = users.id
     WHERE project_id = $1
     ORDER BY tasks.created_at DESC`,
    [projectId]
  );
  return q;
};
const getTaskById = async (taskId) => {
  const q = await query(`SELECT * FROM tasks WHERE id = $1`, [taskId]);
  return q[0];
};
const deleteTask = async (taskId) => {
  const q = await query(`DELETE FROM tasks WHERE id = $1`, [taskId]);
  return q;
};
const editTask = async (taskId, taskName, assignTo, status) => {
  const q = await query(
    `UPDATE tasks SET title = $1, assigned_to_user = $2, status=$3 WHERE id = $4`,
    [taskName, assignTo, status, taskId]
  );
  return q;
};
const editTaskStatus = async (taskId, status) => {
  const q = await query(`UPDATE tasks SET status = $1 WHERE id = $2`, [
    status,
    taskId,
  ]);
  return q;
};

const getTasksByUserId = async (userId) => {
  const q = await query(
    `
    SELECT tasks.created_at, tasks.title, projects.name as project_name, projects.id as project_id
    FROM tasks
    JOIN projects ON tasks.project_id = projects.id
    WHERE assigned_to_user = $1
    AND status = 0
    ORDER BY created_at DESC
  `,
    [userId]
  );
  return q;
};

module.exports = {
  createTask,
  getTaskById,
  getTasks,
  deleteTask,
  editTask,
  editTaskStatus,
  getTasksByUserId,
};
