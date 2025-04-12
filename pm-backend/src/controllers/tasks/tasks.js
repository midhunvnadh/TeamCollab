const {
  createTaskService,
  getTasksService,
  editTaskService,
  getTask,
  deleteTaskService,
} = require("../../services/taskService");

const createTask = async (req, res) => {
  const { name, assignTo: userId, status = 0 } = req.body;
  const { projectId } = req.params;

  if (!name || !projectId) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Task name and project ID are required",
      });
  }

  try {
    const task = await createTaskService(projectId, name, userId, status);
    if (!task.success) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to create task" });
    }
    return res
      .status(201)
      .json({
        success: true,
        message: "Task created successfully",
        taskId: task.taskId,
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getTasks = async (req, res) => {
  const { projectId } = req.params;

  if (!projectId) {
    return res
      .status(400)
      .json({ success: false, message: "Project ID is required" });
  }

  try {
    const tasks = await getTasksService(projectId);
    if (!tasks || tasks.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No tasks found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Tasks fetched successfully", tasks });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const editTask = async (req, res) => {
  const { taskId } = req.params;
  const { name, assignTo: userId, status } = req.body;

  if (!taskId) {
    return res
      .status(400)
      .json({ success: false, message: "Task ID is required" });
  }

  try {
    const task = await editTaskService(taskId, name, userId, status);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    return res
      .status(200)
      .json({
        success: true,
        message: "Task updated successfully",
        taskId: task.taskId,
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getTaskController = async (req, res) => {
  const { taskId } = req.params;

  if (!taskId) {
    return res
      .status(400)
      .json({ success: false, message: "Task ID is required" });
  }

  try {
    const task = await getTask(taskId);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Task fetched successfully", task });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteTaskController = async (req, res) => {
  const { taskId } = req.params;

  if (!taskId) {
    return res
      .status(400)
      .json({ success: false, message: "Task ID is required" });
  }

  try {
    const task = await deleteTaskService(taskId);
    if (!task.success) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  editTask,
  getTaskController,
  deleteTaskController,
};
