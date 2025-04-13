const {
  createTask,
  getTasks,
  editTask,
  getTaskById,
  deleteTask,
  getTasksByUserId,
} = require("../repository/tasks");
const socketUtil = require("../lib/socket");

const createTaskService = async (
  projectId,
  taskName,
  assignTo = null,
  status = 0
) => {
  try {
    const task = await createTask(projectId, taskName, assignTo, status);
    if (task.success) {
      socketUtil.emitTaskUpdate("created", {
        taskId: task.taskId,
        projectId,
        taskName,
        assignTo,
        status,
      });

      // Emit notification if task is created with an assignee
      if (assignTo) {
        socketUtil.emitNotification("task_assigned", {
          taskId: task.taskId,
          assignedUserId: assignTo,
          taskName,
          projectId,
        });
      }

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
      status === undefined ? t.status : status
    );
    if (task) {
      socketUtil.emitTaskUpdate("updated", {
        taskId,
        name: name || t.title,
        assignTo: assignTo || t.assigned_to_user,
        status: status === undefined ? t.status : status,
      });

      // Emit notification if task is assigned to someone
      if (assignTo && assignTo !== t.assigned_to_user) {
        socketUtil.emitNotification("task_assigned", {
          taskId,
          assignedUserId: assignTo,
          taskName: name || t.title,
          projectId: t.project_id,
        });
      }

      return task;
    } else {
      throw new Error("Task not found");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteTaskService = async (taskId) => {
  try {
    const task = await getTaskById(taskId);
    if (!task) {
      throw new Error("Task not found");
    }
    const result = await deleteTask(taskId);
    if (result) {
      socketUtil.emitTaskUpdate("deleted", { taskId });
      return { success: true };
    } else {
      throw new Error("Failed to delete task");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const getLatestUserTasks = async (userId) => {
  try {
    const tasks = await getTasksByUserId(userId);
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
  editTaskService,
  deleteTaskService,
  getTask,
  getLatestUserTasks,
};
