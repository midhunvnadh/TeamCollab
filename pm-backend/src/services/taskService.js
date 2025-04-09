const {
  createTask,
  getTasks,
  editTask,
  getTaskById,
} = require("../repository/tasks");

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

const getTask = async (taskId) => {
  try {
    const task = await getTaskById(taskId);
    if (!task) {
      throw new Error("Task not found");
    }
    return task;
  } catch (error) {
    throw new Error(error.message);
  }
};

const editTaskService = async (taskId, name, assignTo, status) => {
  try {
    const t = await getTaskById(taskId);
    if (!t) {
      throw new Error("Task not found");
    }
    const task = await editTask(
      taskId,
      name || t.title,
      assignTo || t.assigned_to_user,
      status || t.status
    );
    if (task) {
      return task;
    } else {
      throw new Error("Task not found");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createTaskService,
  getTasksService,
  editTaskService,
  getTask,
};
