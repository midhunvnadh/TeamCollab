const {
  createTaskService,
  getTasksService,
} = require("../../services/taskService");

const createTask = async (req, res) => {
  try {
    const { name, assignTo: userId } = req.body;
    const { projectId } = req.params;

    const task = await createTaskService(projectId, name, userId);
    if (!task.success) {
      return res.status(400).json({ message: "Failed to create task" });
    }

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      taskId: task.taskId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const { projectId } = req.params;
    const tasks = await getTasksService(projectId);
    if (!tasks) {
      return res.status(404).json({ message: "No tasks found" });
    }
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
};
