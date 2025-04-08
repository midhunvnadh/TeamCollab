const { createTask, getTasks } = require("../repository/tasks");

const createTaskService = async (
  projectId,
  taskName,
  assignTo = null,
  status = 0
) => {
  try {
    const task = await createTask(projectId, taskName, assignTo, status);
    if (task.success) {
      return { success: true, taskId: task.taskId };
    } else {
      throw new Error("Failed to create task");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const getTasksService = async (projectId) => {
  try {
    const tasks = await getTasks(projectId);
    if (!tasks) {
      throw new Error("No tasks found");
    }
    return tasks;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createTaskService,
  getTasksService,
};
