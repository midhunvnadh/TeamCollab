const { query } = require("../lib/db");

const createTask = async (projectId, taskName, assignTo = null) => {
  const q = await query(
    `INSERT INTO tasks (title, project_id, assigned_to_user) VALUES ($1, $2, $3) RETURNING id`,
    [taskName, projectId, assignTo]
  );
  console.log("q:", q);
  const taskId = q[0].id;
  if (taskId) {
    return { success: true, taskId };
  } else {
    return { success: false };
  }
};
const getTasks = async (projectId) => {
  const q = await query(
    `SELECT id, title, assigned_to_user, status FROM tasks WHERE project_id = $1`,
    [projectId]
  );
  return q;
};
const deleteTask = async (taskId) => {
  const q = await query(`DELETE FROM tasks WHERE id = $1`, [taskId]);
  return q;
};
const editTask = async (taskId, taskName, assignTo) => {
  const q = await query(
    `UPDATE tasks SET title = $1, assigned_to_user = $2 WHERE id = $3`,
    [taskName, assignTo, taskId]
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

module.exports = {
  createTask,
  getTasks,
  deleteTask,
  editTask,
  editTaskStatus,
};
